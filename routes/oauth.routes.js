
const express = require("express");
const router = express.Router();
const oauthService = require("../services/oauth.service");

/**
 * 1️Inicia el flujo OAuth
 */
router.get("/login", (req, res) => {
  const authUrl = oauthService.getAuthorizationUrl();
  res.redirect(authUrl);
});

/**
 * 2 Callback: Mercado Libre devuelve el code
 */
router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Code no recibido" });
    }

    const tokens = await oauthService.exchangeCodeForToken(code);

    res.json({
      ok: true,
      message: "OAuth completado",
      tokens
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en OAuth" });
  }
});

module.exports = router;
