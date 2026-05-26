const { substract, divide, multiply } = require("../Resta-multiplicacion");

describe("Resta-multiplicacion", () => {
  // describe() agrupa tests relacionados
  describe("substract()", () => {
    it("resta dos números positivos correctamente", () => {
      // Arrange
      const a = 5,
        b = 3;

      // Act
      const result = substract(a, b);

      // Assert
      expect(result).toBe(2);
    });

    it("resta números negativos", () => {
      expect(substract(-1, -4)).toBe(3);
    });
  });

  describe("multiply()", () => {
    it("multiplica dos números positivos correctamente", () => {
      expect(multiply(2, 3)).toBe(6);
    });
  });
});
