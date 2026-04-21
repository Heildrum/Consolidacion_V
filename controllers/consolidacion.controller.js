


console.log(" controller cargado (inicio)");

let ordersService;
let transformService;
let excelService;

try {
  ordersService = require("../services/orders.service");
  console.log(" orders.service cargado");
} catch (e) {
  console.error(" ERROR cargando orders.service", e.message);
  throw e;
}

try {
  transformService = require("../services/transform.service");
  console.log(" transform.service cargado");
} catch (e) {
  console.error(" ERROR cargando transform.service", e.message);
  throw e;
}

try {
  excelService = require("../services/excel.service");
  console.log(" excel.service cargado");
} catch (e) {
  console.error(" ERROR cargando excel.service", e.message);
  throw e;
}

async function generarReporte(req, res) {
  res.json({ ok: true, message: "Controller cargó correctamente" });
}

module.exports = {
  generarReporte
};
