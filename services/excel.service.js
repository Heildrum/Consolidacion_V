
const XLSX = require("xlsx");

function generarExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Consolidación");

  return XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer"
  });
}

module.exports = {
  generarExcel
};
