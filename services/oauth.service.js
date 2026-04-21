
const axios = require("axios");
const { clientId, clientSecret, redirectUri } = require("../config/ml.oauth");

const AUTH_URL = "https://auth.mercadolibre.com.ar/authorization";
const TOKEN_URL = "https://api.mercadolibre.com/oauth/token";

function getAuthorizationUrl() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri
  });

  return `${AUTH_URL}?${params.toString()}`;
}

async function exchangeCodeForToken(code) {
  const response = await axios.post(
    TOKEN_URL,
    {
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

module.exports = {
  getAuthorizationUrl,
  exchangeCodeForToken
};
