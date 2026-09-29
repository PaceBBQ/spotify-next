import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Results from '../components/Results';
import { buildApiUrl, spotifyProfileURL, spotifyPlaylistURL } from '../api/spotify-api';

const User = ({ user, playlist, error }) => {
  const router = useRouter();

  if (error) {
    return (
      <Layout>
        <div className="row mt-5 justify-content-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error loading profile</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">
              <a href="/spotify" className="btn btn-primary">
                Try logging in again
              </a>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const routeToSearchArtists = (event) => {
    event.preventDefault();
    const { access_token } = router.query;
    router.push({
      pathname: '/search-artists',
      query: { access_token }
    });
  };

  const renderPlaylist = () => {
    if (!playlist || playlist.length === 0) {
      return <p className="text-center text-muted">No playlists found</p>;
    }

    return playlist.map((list) => (
      <Results
        key={list.id}
        name={list.name}
        imageURL={list.images?.[0]?.url}
      />
    ));
  };

  const firstName = user?.display_name?.split(" ")[0] || "User";
  const profileImage = user?.images?.[0]?.url;

  return (
    <Layout>
      <div className="row mt-5 justify-content-center">
        <h3>Welcome {firstName}!</h3>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 text-end">
          {profileImage && (
            <img 
              src={profileImage} 
              className="img-fluid rounded" 
              alt={`${user.display_name}'s profile`}
              style={{ maxWidth: '300px' }}
            />
          )}
        </div>
        <div className="col-md-6 text-start">
          <h6>Username:</h6>
          <p>{user?.id}</p>
          <h6>Email:</h6>
          <p>{user?.email}</p>
          <h6>Total Followers:</h6>
          <p>{user?.followers?.total || 0}</p>
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <button
          className="btn btn-success"
          onClick={routeToSearchArtists}
        >
          Search Artists
        </button>
      </div>
      <div className="row mt-5 justify-content-center">
        <h5>My Playlists</h5>
      </div>
      <div className="row mt-2">
        {renderPlaylist()}
      </div>
    </Layout>
  );
};

User.getInitialProps = async (context) => {
  const { access_token } = context.query;

  if (!access_token) {
    return {
      error: 'No access token provided. Please log in.'
    };
  }

  try {
    const profileUrl = buildApiUrl(spotifyProfileURL, access_token);
    const profileResponse = await fetch(profileUrl);
    
    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${profileResponse.status}`);
    }
    
    const user = await profileResponse.json();

    const playlistUrl = buildApiUrl(spotifyPlaylistURL, access_token);
    const playlistResponse = await fetch(playlistUrl);
    
    if (!playlistResponse.ok) {
      throw new Error(`Failed to fetch playlists: ${playlistResponse.status}`);
    }
    
    const playlistData = await playlistResponse.json();

    return {
      user,
      playlist: playlistData.items || []
    };
  } catch (error) {
    return {
      error: error.message || 'An error occurred while fetching data'
    };
  }
};

export default User;