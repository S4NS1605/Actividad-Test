const { OrderService, InsufficientStockError } = require('../orderService');

describe('OrderService - Ejercicio 2', () => {
  let mockInventoryRepo;
  let mockNotificationService;
  let orderService;

  beforeEach(() => {
    // Creamos mocks limpios antes de cada test
    mockInventoryRepo = {
      getStock: jest.fn(),
      decreaseStock: jest.fn()
    };
    mockNotificationService = {
      sendConfirmation: jest.fn()
    };
    orderService = new OrderService(mockInventoryRepo, mockNotificationService);
  });

  it('placeOrder_ValidOrder_DecreasesStockAndSendsNotification', async () => {
    mockInventoryRepo.getStock.mockResolvedValue(10); // Simula que hay 10 en stock

    const order = await orderService.placeOrder(1, 101, 3);

    expect(order.status).toBe('confirmed');
    expect(mockInventoryRepo.decreaseStock).toHaveBeenCalledWith(101, 3);
    expect(mockNotificationService.sendConfirmation).toHaveBeenCalledWith(1, order.orderId);
  });

  it('placeOrder_InsufficientStock_ThrowsException', async () => {
    mockInventoryRepo.getStock.mockResolvedValue(2); // Stock insuficiente

    await expect(orderService.placeOrder(1, 101, 5))
      .rejects.toThrow(InsufficientStockError);

    // Verificación clave de la guía: si falla el stock, NUNCA se debe reducir el inventario
    expect(mockInventoryRepo.decreaseStock).not.toHaveBeenCalled();
  });

  it('placeOrder_InvalidQuantity_ThrowsException', async () => {
    await expect(orderService.placeOrder(1, 101, 0))
      .rejects.toThrow("La cantidad debe ser mayor a cero.");
  });

  it('placeOrder_OnSuccess_NotificationServiceCalledOnce', async () => {
    mockInventoryRepo.getStock.mockResolvedValue(10);

    const order = await orderService.placeOrder(1, 101, 2);

    expect(mockNotificationService.sendConfirmation).toHaveBeenCalledTimes(1);
    expect(mockNotificationService.sendConfirmation).toHaveBeenCalledWith(1, order.orderId);
  });
});