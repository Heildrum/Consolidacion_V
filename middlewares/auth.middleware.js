
function requireMeliAuth(req, res, next) {
  try {
    // 1. Intentamos leer del archivo de configuración
    const cuentasML = require("../config/cuentasML");

    // 2. Verificamos si hay una cuenta con token en el archivo
    const autorizadoPorArchivo =
      Array.isArray(cuentasML) &&
      cuentasML.some(cuenta => cuenta.token && cuenta.token.length > 0);

    // 3. Verificamos si existe el token en las variables de entorno de Render
    const autorizadoPorRender = process.env.ML_ACCESS_TOKEN && process.env.ML_ACCESS_TOKEN.length > 0;

    // Si cualquiera de las dos es válida, dejamos pasar
    if (autorizadoPorArchivo || autorizadoPorRender) {
      return next();
    }

    // Si no hay ninguna, enviamos el error
    return res.status(401).json({
      ok: false,
      message: "No hay cuentas de Mercado Libre autorizadas"
    });

  } catch (error) {
    console.error("Error en auth.middleware:", error);

    // Si el archivo no existe o falla, pero tenemos el token en Render, dejamos pasar
    if (process.env.ML_ACCESS_TOKEN) {
      return next();
    }

    return res.status(500).json({
      ok: false,
      message: "Error verificando autorización Mercado Libre"
    });
  }
}
