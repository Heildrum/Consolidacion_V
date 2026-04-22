
require("dotenv").config();
console.log("✅ app.js cargado");

const express = require("express");
const path = require("path");

const app = express();

// ================================
// MIDDLEWARES BASE
// ================================
app.use(express.json());

// ================================
// PATHS
// ================================
const PUBLIC_PATH = path.join(__dirname, "public");

// ================================
// RUTAS (IMPORTACIONES)
// ================================

// ⚠️ IMPORTANTE:
// auth.middleware DEBE exportar una FUNCIÓN
const requireMeliAuth = require("./middlewares/auth.middleware");
console.log("Tipo de requireMeliAuth:", typeof requireMeliAuth);
// Rutas de negocio
const consolidacionRoutes = require("./routes/consolidacion.routes");

// Rutas OAuth
const oauthRoutes = require("./routes/oauth.routes");

// ================================
// OAUTH (NO PROTEGIDO)
// ================================
// OAuth SIEMPRE va antes de cualquier middleware de auth
app.use("/oauth", oauthRoutes);

// ================================
// FRONTEND (INDEX)
// ================================
// El index pasa por middleware, pero ahora el middleware deja pasar
app.get("/", requireMeliAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});

// ================================
// API PROTEGIDA
// ================================
app.use("/api/consolidacion", requireMeliAuth, consolidacionRoutes);

// ================================
// ARCHIVOS ESTÁTICOS (CSS, JS, etc.)
// ================================
app.use(express.static(PUBLIC_PATH));

// ================================
// SERVER
// ================================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Consolidación ML levantada en puerto ${PORT}`);
});
