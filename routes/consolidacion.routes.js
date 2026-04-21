

const express = require("express");
const path = require("path");

const router = express.Router();

// ================================
// CARGAR CONTROLLER
// ================================
const controllerPath = path.resolve(
  __dirname,
  "..",
  "controllers",
  "consolidacion.controller.js"
);

console.log("📌 Intentando cargar controller desde:", controllerPath);

// Cargar controller completo
const consolidacionController = require(controllerPath);

// ================================
// VALIDACIÓN DEFENSIVA (MUY IMPORTANTE)
// ================================
if (typeof consolidacionController.generarReporte !== "function") {
  throw new Error(
    "❌ El controller consolidacion.controller.js NO exporta una función llamada generarReporte"
  );
}

// ================================
// RUTAS
// ================================
router.get("/export", consolidacionController.generarReporte);

module.exports = router;


