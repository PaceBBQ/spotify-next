import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { spotifyWebApiURL } from '../api/spotify-api';

const Spotify = () => {
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        if (token) {
          setAccessToken(token);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (accessToken === '') {
      window.location.href = spotifyWebApiURL;
    } else {
      router.push({
        pathname: '/user',
        query: { access_token: accessToken }
      });
    }
  };

  return (
    <Layout>
      <div className="row mt-5 justify-content-center">
        <h3 className="text-center">
          {accessToken !== '' 
            ? 'Awesome! Authentication was successful!' 
            : 'Login with Spotify'}
        </h3>
      </div>
      <div className="row justify-content-center mt-5">
        <button 
          onClick={handleLogin} 
          className="btn btn-success btn-lg"
        >
          {accessToken !== '' ? 'Proceed to Nextify' : 'Login'}
        </button>
      </div>
    </Layout>
  );
};

export default Spotify;
