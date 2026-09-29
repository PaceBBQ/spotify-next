import React from 'react';
import ReactPlayer from 'react-player';
import Layout from '../components/Layout';
import Results from '../components/Results';
import { buildApiUrl, spotifyAlbumURL } from '../api/spotify-api';

const AlbumTracks = ({ tracks, albumName, error }) => {
  if (error) {
    return (
      <Layout>
        <div className="row mt-5 justify-content-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error loading tracks</h4>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const renderTracks = () => {
    if (!tracks || tracks.length === 0) {
      return <p className="text-center text-muted">No tracks found</p>;
    }

    return tracks.map((track) => (
      <Results
        key={track.id}
        name={track.name}
        columnWidth="col-md-3"
      >
        {track.preview_url ? (
          <ReactPlayer
            url={track.preview_url}
            playing={false}
            width={200}
            height={80}
            style={{ backgroundColor: '#27ae60' }}
            controls={true}
            config={{
              file: {
                forceAudio: true
              }
            }}
          />
        ) : (
          <p className="text-muted small">No preview available</p>
        )}
      </Results>
    ));
  };

  return (
    <Layout>
      <div className="row mt-5 justify-content-center">
        <h1 className="display-4 text-center">
          {albumName ? `${albumName} - Tracks` : 'Album Tracks'}
        </h1>
      </div>
      <div className="row mt-5">
        {renderTracks()}
      </div>
    </Layout>
  );
};

AlbumTracks.getInitialProps = async (context) => {
  const { access_token, id } = context.query;

  if (!access_token || !id) {
    return {
      error: 'Missing required parameters'
    };
  }

  try {
    const tracksUrl = buildApiUrl(`${spotifyAlbumURL}${id}/tracks`, access_token);
    const response = await fetch(tracksUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch tracks: ${response.status}`);
    }

    const data = await response.json();

    const albumUrl = buildApiUrl(`${spotifyAlbumURL}${id}`, access_token);
    const albumResponse = await fetch(albumUrl);
    const albumData = albumResponse.ok ? await albumResponse.json() : null;

    return {
      tracks: data.items || [],
      albumName: albumData?.name || null
    };
  } catch (error) {
    return {
      error: error.message || 'An error occurred while fetching tracks'
    };
  }
};

export default AlbumTracks;