import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import Results from '../components/Results';
import { buildApiUrl, spotifySearchURL } from '../api/spotify-api';

const SearchArtists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { access_token } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash.includes('access_token') && !access_token) {
      router.push('/spotify');
    }
  }, [access_token, router]);

  const submitArtistForm = async (event) => {
    event.preventDefault();
    
    if (searchTerm.trim() === '') {
      setError('Please enter an artist name');
      return;
    }

    if (!access_token) {
      setError('No access token found. Please log in again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const searchUrl = buildApiUrl(spotifySearchURL, access_token, {
        q: searchTerm,
        type: 'artist'
      });

      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      setArtists(data.artists?.items || []);
    } catch (err) {
      setError(err.message || 'Failed to search artists');
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (loading) {
      return (
        <div className="col-12 text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-12">
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        </div>
      );
    }

    if (artists.length === 0) {
      return null;
    }

    return artists
      .filter(artist => artist.images && artist.images.length > 0)
      .map((artist) => (
        <Results
          key={artist.id}
          imageURL={artist.images[0]?.url}
          name={artist.name}
        >
          <Link 
            href={`/artist-albums?id=${artist.id}&access_token=${access_token}`}
            className="text-muted"
          >
            View {artist.name} albums
          </Link>
        </Results>
      ));
  };

  return (
    <Layout>
      <div className="row mt-5 justify-content-center">
        <h3 className="text-center">
          {artists.length > 0
            ? `Search results for "${searchTerm}"`
            : 'Search the Spotify API for your favorite artist'}
        </h3>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-md-6">
          <form onSubmit={submitArtistForm}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter artist name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button 
                type="submit" 
                className="form-control btn btn-outline-success"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        {renderSearchResults()}
      </div>
    </Layout>
  );
};

export default SearchArtists;