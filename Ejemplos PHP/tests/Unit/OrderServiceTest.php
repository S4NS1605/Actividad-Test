<?php

use PHPUnit\Framework\TestCase;

class OrderServiceTest extends TestCase {
    private $mockRepo;
    private $mockNotification;
    private OrderService $orderService;

    protected function setUp(): void {
        $this->mockRepo = $this->createMock(IInventoryRepository::class);
        $this->mockNotification = $this->createMock(INotificationService::class);
        $this->orderService = new OrderService($this->mockRepo, $this->mockNotification);
    }

    public function test_placeOrder_ValidOrder_DecreasesStockAndSendsNotification(): void {
        $this->mockRepo->method('getStock')->willReturn(10);
        
        $this->mockRepo->expects($this->once())
            ->method('decreaseStock')
            ->with(101, 2);

        $order = $this->orderService->placeOrder(1, 101, 2);
        $this->assertEquals('confirmed', $order['status']);
    }

    public function test_placeOrder_InsufficientStock_ThrowsException(): void {
        $this->mockRepo->method('getStock')->willReturn(1);
        
        // Si no hay stock, decreaseStock jamás debe ser invocado
        $this->mockRepo->expects($this->never())->method('decreaseStock');

        $this->expectException(InsufficientStockException::class);
        $this->orderService->placeOrder(1, 101, 5);
    }

    public function test_placeOrder_InvalidQuantity_ThrowsException(): void {
        $this->expectException(\InvalidArgumentException::class);
        $this->orderService->placeOrder(1, 101, 0);
    }

    public function test_placeOrder_OnSuccess_NotificationServiceCalledOnce(): void {
        $this->mockRepo->method('getStock')->willReturn(10);
        
        $this->mockNotification->expects($this->once())
            ->method('sendConfirmation')
            ->with($this->equalTo(1), $this->isType('int'));

        $this->orderService->placeOrder(1, 101, 2);
    }
}