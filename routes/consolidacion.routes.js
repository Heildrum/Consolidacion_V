


const express = require("express");
const router = express.Router();
const path = require("path");

// Resolver ruta absoluta del controller
const controllerPath = path.resolve(
  __dirname,
  "..",
  "controllers",
  "consolidacion.controller.js"
);

console.log("📌 Intentando cargar controller desde:", controllerPath);

//  Cargar controller
const { generarReporte } = require(controllerPath);

//  Ruta real
router.get("/export", generarReporte);

module.exports = router;
