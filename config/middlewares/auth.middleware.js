
/**
 * Middleware de autorización Mercado Libre
 * Permite acceso solo si existe al menos un token configurado
 */
function requireMeliAuth(req, res, next) {
  try {
    const cuentasML = require("../config/cuentasML");

    const autorizado =
      Array.isArray(cuentasML) &&
      cuentasML.some(cuenta => cuenta.token && cuenta.token.length > 0);

    if (autorizado) {
      return next();
    }

    return res.status(401).json({
      ok: false,
      message: "No hay cuentas de Mercado Libre autorizadas"
    });

  } catch (error) {
    console.error("Error en auth.middleware:", error);
    return res.status(500).json({
      ok: false,
      message: "Error verificando autorización Mercado Libre"
    });
  }
}

module.exports = requireMeliAuth;
