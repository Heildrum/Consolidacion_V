
function transformarOrdenes(ordenesCrudas) {
  const filas = [];

  for (const registro of ordenesCrudas) {
    const { cuenta, order } = registro;

    for (const item of order.order_items) {
      const variantes = item.item.variation_attributes || [];

      const color = variantes.find(v => v.name === "Color")?.value_name || "";
      const talla = variantes.find(v => v.name === "Talla")?.value_name || "";

      let tipoEnvio = "OTRO";

      const shippingName = order.shipping?.shipping_option?.name;
      const shippingMode = order.shipping?.mode;

      if (shippingName === "Self Service") {
        tipoEnvio = "FLEX";
      } else if (shippingMode === "cross_docking" || shippingMode === "drop_off") {
        tipoEnvio = "COLECTA";
      }

      filas.push({
        cuenta,
        order_id: order.id,
        shipping_id: order.shipping?.id || "",
        item_id: item.item.id,
        titulo: item.item.title,
        color,
        talla,
        envio: tipoEnvio
      });
    }
  }

  return filas;
}

module.exports = {
  transformarOrdenes
};
