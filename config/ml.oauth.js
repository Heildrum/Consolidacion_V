
module.exports = {
  clientId: process.env.ML_CLIENT_ID,
  clientSecret: process.env.ML_CLIENT_SECRET,
  redirectUri: `${process.env.BASE_URL}/oauth/callback`
};
