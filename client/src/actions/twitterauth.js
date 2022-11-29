import * as queryString from 'query-string';

const TwitterClientId = import.meta.env.VITE_TWITTER_CLIENT_ID
const TwitterRedirectURL = import.meta.env.VITE_TWITTER_REDIRECT_URL


const stringifiedParams = queryString.stringify({
    client_id: TwitterClientId,
    redirect_uri: TwitterRedirectURL,
    scope: [
        "users.read", 
        "tweet.read", 
        'offline.access'
    ].join(' '), // space seperated string
    state:'state',
    code_challenge: 'challenge',
    code_challenge_method:'plain',
    response_type: 'code',    
    prompt: 'consent',    
  });
  
const twitterLoginUrl = `https://twitter.com/i/oauth2/authorize?${stringifiedParams}`;

export default twitterLoginUrl