
function manejarErrorML(error) {
  if (error?.message?.includes("invalid_token")) {
    return "Token de Mercado Libre inválido o expirado";
  }

  return "Error desconocido de Mercado Libre";
}

module.exports = {
  manejarErrorML
};
