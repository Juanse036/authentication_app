import * as queryString from 'query-string';



const stringifiedParams = queryString.stringify({
    client_id: "481743457362-fdk3ja1ofeptfbeivlsur0uub31pmu6m.apps.googleusercontent.com",
    redirect_uri: 'http://127.0.0.1:5173/google',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export default googleLoginUrl