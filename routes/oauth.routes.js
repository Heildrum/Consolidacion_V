

const axios = require("axios");

function getAuthorizationUrl() {
  return (
    "https://auth.mercadolibre.com/authorization" +
    "?response_type=code" +
    "&client_id=" + process.env.ML_CLIENT_ID +
    "&redirect_uri=https%3A%2F%2Fconsolidacion-v.onrender.com%2Foauth%2Fcallback"
  );
}

async function exchangeCodeForToken(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.ML_CLIENT_ID,
    client_secret: process.env.ML_CLIENT_SECRET,
    code: code,
    redirect_uri: "https://consolidacion-v.onrender.com/oauth/callback"
  });

  const response = await axios.post(
    "https://api.mercadolibre.com/oauth/token",
    body.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      }
    }
  );

  return response.data;
}

module.exports = {
  getAuthorizationUrl,
  exchangeCodeForToken
};
