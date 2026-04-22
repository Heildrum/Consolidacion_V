

const express = require("express");
const router = express.Router();
const axios = require("axios");

// ==========================================
// LÓGICA DE NEGOCIO (Mantenida intacta)
// ==========================================

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

// ==========================================
// DEFINICIÓN DE RUTAS (Para que Express funcione)
// ==========================================

// Ruta para iniciar el login (ej: /oauth/login)
router.get("/login", (req, res) => {
  const url = getAuthorizationUrl();
  res.redirect(url);
});

// Ruta de retorno (Callback) donde llega el 'code'
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No se recibió el código de autorización");
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    
    // Aquí es donde obtienes tu REFRESH TOKEN
    console.log("Tokens obtenidos:", tokens);
    
    // TODO: Guarda 'tokens.refresh_token' en tu archivo de configuración o DB
    
    res.json({
      message: "Autorización exitosa",
      data: tokens
    });
  } catch (error) {
    console.error("Error al intercambiar el token:", error.response?.data || error.message);
    res.status(500).json({
      error: "Error al obtener el token",
      details: error.response?.data || error.message
    });
  }
});

// EXPORTACIÓN CORRECTA PARA APP.JS
module.exports = router;
