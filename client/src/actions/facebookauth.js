import * as queryString from 'query-string';

const FacebookClientId = import.meta.env.VITE_FACEBOOK_CLIENT_ID
const FacebookRedirectURL = import.meta.env.VITE_FACEBOOK_REDIRECT_URL



const stringifiedParams = queryString.stringify({
  client_id: FacebookClientId,
  redirect_uri: FacebookRedirectURL,
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

export default facebookLoginUrl