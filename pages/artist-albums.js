import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { buildApiUrl, spotifyArtistURL } from '../api/spotify-api';
import Results from '../components/Results';

const ArtistAlbums = ({ albums, artistName, error }) => {
  const router = useRouter();
  const { access_token } = router.query;

  if (error) {
    return (
      <Layout>
        <div className="row mt-5 justify-content-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error loading albums</h4>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const showAlbums = () => {
    if (!albums || albums.length === 0) {
      return <p className="text-center text-muted">No albums found</p>;
    }

    return albums
      .filter(album => album.images && album.images.length > 0)
      .map((album) => (
        <Results
          key={album.id}
          name={album.name}
          imageURL={album.images[0]?.url}
        >
          <Link
            href={`/album-tracks?id=${album.id}&access_token=${access_token}`}
            className="text-muted"
          >
            View {album.name} tracks
          </Link>
        </Results>
      ));
  };

  return (
    <Layout>
      <div className="row mt-5 justify-content-center">
        <h1 className="display-4 text-center">
          {artistName ? `${artistName}'s Albums` : 'Artist Albums'}
        </h1>
      </div>
      <div className="row mt-5">
        {showAlbums()}
      </div>
    </Layout>
  );
};

ArtistAlbums.getInitialProps = async (context) => {
  const { access_token, id } = context.query;

  if (!access_token || !id) {
    return {
      error: 'Missing required parameters'
    };
  }

  try {
    const albumsUrl = buildApiUrl(`${spotifyArtistURL}${id}/albums`, access_token, {
      album_type: 'album'
    });

    const response = await fetch(albumsUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status}`);
    }

    const data = await response.json();

    const artistUrl = buildApiUrl(`${spotifyArtistURL}${id}`, access_token);
    const artistResponse = await fetch(artistUrl);
    const artistData = artistResponse.ok ? await artistResponse.json() : null;

    return {
      albums: data.items || [],
      artistName: artistData?.name || null
    };
  } catch (error) {
    return {
      error: error.message || 'An error occurred while fetching albums'
    };
  }
};

export default ArtistAlbums;