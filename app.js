require("dotenv").config();
console.log("app.js cargado");

const express = require("express");
const path = require("path");

// const cors = require("cors"); // opcional

const app = express();

// app.use(cors());
app.use(express.json());

// ================================
// PATHS
// ================================
const PUBLIC_PATH = path.join(__dirname, "public");

// ================================
// MIDDLEWARE AUTORIZACIÓN ML
// ================================
const requireMeliAuth = require("./middlewares/auth.middleware");

// ================================
// RUTAS API
// ================================
const consolidacionRoutes = require("./routes/consolidacion.routes");
const oauthRoutes = require("./routes/oauth.routes");

// ================================
// FRONTEND (INDEX → PUERTA DE ENTRADA)
// ================================
app.get("/", requireMeliAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});

// ================================
// API PROTEGIDA
// ================================
app.use("/api/consolidacion", requireMeliAuth, consolidacionRoutes);

// ================================
// OAUTH (NO PROTEGIDO)
// ================================
app.use("/oauth", oauthRoutes);

// ================================
// STATIC FILES (CSS, JS, etc.)
// ================================
app.use(express.static(PUBLIC_PATH));

// ================================
// SERVER
// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Consolidación ML en puerto ${PORT}`);
});
