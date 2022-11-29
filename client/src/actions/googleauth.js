import * as queryString from 'query-string';

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const GoogleRedirectURL = import.meta.env.VITE_GOOGLE_REDIRECT_URL



const stringifiedParams = queryString.stringify({
    client_id: GoogleClientId,
    redirect_uri: GoogleRedirectURL,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    auth: 'google'
  });
  
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export default googleLoginUrl