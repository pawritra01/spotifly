import {
  base64encode,
  generateRandomString,
  sha256,
} from "../../utils/authUtils";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const scope = import.meta.env.VITE_SPOTIFY_SCOPE;
const authUrl = new URL("https://accounts.spotify.com/authorize");
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export const redirectAuth = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

export const getToken = async (code: string) => {
  let codeVerifier = localStorage.getItem("code_verifier") as string;

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(tokenEndpoint, payload);
  const response = await body.json();

  return response;
};

export const updateToken = async () => {
  let refreshToken = localStorage.getItem("refresh_token") as string;

  if(!refreshToken) return Promise.reject('Data not found.');

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  const body = await fetch(tokenEndpoint, payload);
  const response = await body.json();


  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);

  return response;
};
