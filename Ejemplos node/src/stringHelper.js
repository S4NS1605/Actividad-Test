function truncate(text, maxLength, suffix = "...") {
  if (maxLength <= 0) {
    throw new Error("El límite debe ser un número positivo.");
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + suffix;
}

function toSlug(text) {
  // 1. Convertir a minúsculas
  let slug = text.toLowerCase();
  // 2. Eliminar caracteres especiales (dejar solo letras, números y espacios)
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  // 3. Convertir espacios múltiples en un solo guión y limpiar extremos
  return slug.trim().replace(/\s+/g, '-');
}

function countWords(text) {
  // Manejar texto vacío o lleno de espacios puros
  if (!text || !text.trim()) return 0;
  // Dividir por cualquier cantidad de espacios y contar elementos válidos
  return text.split(/\s+/).filter(Boolean).length;
}

module.exports = { truncate, toSlug, countWords };