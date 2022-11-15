import * as queryString from 'query-string';

const stringifiedParams = queryString.stringify({
  client_id: '498045525593544',
  redirect_uri: 'https://127.0.0.1:5173/facebook',
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

export default facebookLoginUrl