const getClientID = () => {
  if (typeof window === 'undefined') {
    return process.env.SPOTIFY_CLIENT_ID || '';
  }
  return '';
};

const getRedirectURI = () => {
  if (typeof window === 'undefined') {
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
    return `${baseUrl}/spotify`;
  }
  return `${window.location.origin}/spotify`;
};

const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const clientID = getClientID();
const redirectURI = getRedirectURI();

export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me";
export const spotifyPlaylistURL = "https://api.spotify.com/v1/me/playlists";
export const spotifySearchURL = "https://api.spotify.com/v1/search";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";

export const buildApiUrl = (baseUrl, accessToken, params = {}) => {
  const url = new URL(baseUrl);
  url.searchParams.append('access_token', accessToken);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
};
