<?php

interface IInventoryRepository {
    public function getStock(int $productId): int;
    public function decreaseStock(int $productId, int $quantity): void;
}

interface INotificationService {
    public function sendConfirmation(int $userId, int $orderId): void;
}

class InsufficientStockException extends \Exception {}

class OrderService {
    private IInventoryRepository $inventoryRepo;
    private INotificationService $notificationService;

    public function __construct(IInventoryRepository $inventoryRepo, INotificationService $notificationService) {
        $this->inventoryRepo = $inventoryRepo;
        $this->notificationService = notificationService;
    }

    public function placeOrder(int $userId, int $productId, int $quantity): array {
        if ($quantity <= 0) {
            throw new \InvalidArgumentException("La cantidad debe ser mayor a cero.");
        }

        $stock = $this->inventoryRepo->getStock($productId);
        if ($stock < $quantity) {
            throw new InsufficientStockException("Stock insuficiente.");
        }

        $this->inventoryRepo->decreaseStock($productId, quantity: $quantity);
        
        $orderId = rand(1, 10000);
        $this->notificationService->sendConfirmation($userId, $orderId);

        return [
            'orderId' => $orderId,
            'userId' => $userId,
            'productId' => $productId,
            'quantity' => $quantity,
            'status' => 'confirmed'
        ];
    }
}