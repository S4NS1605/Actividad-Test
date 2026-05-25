class InsufficientStockError extends Error {
  constructor(message) {
    super(message);
    this.name = "InsufficientStockError";
  }
}

class OrderService {
  constructor(inventoryRepository, notificationService) {
    this.inventoryRepo = inventoryRepository;
    this.notificationService = notificationService;
  }

  async placeOrder(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new Error("La cantidad debe ser mayor a cero.");
    }

    const availableStock = await this.inventoryRepo.getStock(productId);
    if (availableStock < quantity) {
      throw new InsufficientStockError("Stock insuficiente para procesar la orden.");
    }

    await this.inventoryRepo.decreaseStock(productId, quantity);
    
    // Generamos un orderId secuencial o aleatorio para el retorno
    const orderId = Math.floor(Math.random() * 10000) + 1;
    await this.notificationService.sendConfirmation(userId, orderId);

    return {
      orderId,
      userId,
      productId,
      quantity,
      status: 'confirmed'
    };
  }
}

module.exports = { OrderService, InsufficientStockError };