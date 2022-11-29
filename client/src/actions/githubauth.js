import * as queryString from 'query-string';

const GithubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID
const GithubRedirectURL = import.meta.env.VITE_GITHUB_REDIRECT_URL

const params = queryString.stringify({
  client_id: GithubClientId,
  redirect_uri: GithubRedirectURL,
  scope: [
    'read:user', 
    'user:email'
  ].join(' '), // space seperated string
  allow_signup: true,
});

const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

export default githubLoginUrl