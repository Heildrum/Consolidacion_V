
const axios = require("axios");
const cuentasML = require("../config/cuentasML");

/**
 * Obtiene las órdenes de todas las cuentas definidas en config/cuentasML.js
 * @param {Object} params
 * @param {string} params.fechaInicio - Fecha inicio (YYYY-MM-DD)
 * @param {string} params.fechaFin - Fecha fin (YYYY-MM-DD)
 */
async function obtenerOrdenes({ fechaInicio, fechaFin }) {
  const todasLasOrdenes = [];

  for (const cuenta of cuentasML) {
    const { nombre, sellerId, token } = cuenta;

    if (!token) {
      console.warn(` Token faltante para la cuenta: ${nombre}`);
      continue;
    }

    try {
      const response = await axios.get(
        "https://api.mercadolibre.com/orders/search",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            seller: sellerId,
            "order.date_created.from": fechaInicio,
            "order.date_created.to": fechaFin,
            limit: 50
          }
        }
      );

      const orders = response.data?.results || [];

      for (const order of orders) {
        todasLasOrdenes.push({
          cuenta: nombre,
          order
        });
      }

    } catch (error) {
      console.error(
        ` Error obteniendo órdenes de ${nombre}:`,
        error.response?.data || error.message
      );
    }
  }

  return todasLasOrdenes;
}

module.exports = {
  obtenerOrdenes
};
