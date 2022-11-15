import * as queryString from 'query-string';

const stringifiedParams = queryString.stringify({
    client_id: "WHo0WUNiRzhialI2ZjdMc3dzYTY6MTpjaQ",
    redirect_uri: 'https://127.0.0.1:5173/twitter',
    scope: [
        "users.read", 
        "tweet.read", 
        "follows.read", 
        "follows.write"
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    auth: 'twitter'
  });
  
const twitterLoginUrl = `https://twitter.com/i/oauth2/authorize?${stringifiedParams}`;

export default twitterLoginUrl