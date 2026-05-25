const { truncate, toSlug, countWords } = require('../stringHelper');

describe('StringHelper - Ejercicio 1', () => {

  describe('truncate()', () => {
    it('debe devolver el texto intacto si es más corto que el límite', () => {
      expect(truncate('Hola', 10)).toBe('Hola');
    });

    it('debe truncar y añadir el sufijo si supera el límite', () => {
      expect(truncate('Desarrollo de Software', 10)).toBe('Desarrollo...');
    });

    it('debe lanzar un error si el límite es 0 o negativo', () => {
      expect(() => truncate('Texto', 0)).toThrow('El límite debe ser un número positivo.');
    });
  });

  describe('toSlug()', () => {
    it('debe transformar una cadena con caracteres especiales y espacios a un slug limpio', () => {
      expect(toSlug('¡Hola Mundo! 2024')).toBe('hola-mundo-2024');
    });

    it('debe manejar múltiples espacios intermedios correctamente', () => {
      expect(toSlug('Texto    con    muchos   espacios')).toBe('texto-con-muchos-espacios');
    });
  });

  describe('countWords()', () => {
    it('debe contar correctamente las palabras separadas por espacios normales', () => {
      expect(countWords('Análisis y Desarrollo')).toBe(3);
    });

    it('debe retornar 0 si el texto está vacío o solo contiene espacios', () => {
      expect(countWords('    ')).toBe(0);
    });
  });

});