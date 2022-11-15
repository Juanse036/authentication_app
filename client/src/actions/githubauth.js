import * as queryString from 'query-string';

const params = queryString.stringify({
  client_id: '369d770933e78a2e26f0',
  redirect_uri: 'https://127.0.0.1:5173/github',
  scope: [
    'read:user', 
    'user:email'
  ].join(' '), // space seperated string
  allow_signup: true,
});

const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

export default githubLoginUrl