import { PrismaClient, OrderStatus, PaymentStatus } from '@prisma/client';
import { OrderRepository, type OrderFilters, type OrderWithItems, type CreateOrderInput } from '../repositories/orderRepository';

export class OrderService {
  private repository: OrderRepository;

  constructor(prisma: PrismaClient) {
    this.repository = new OrderRepository(prisma);
  }

  async getOrders(filters: OrderFilters = {}): Promise<OrderWithItems[]> {
    return this.repository.findAll(filters);
  }

  async getOrderByIdOrNumber(idOrNumber: string): Promise<OrderWithItems | null> {
    return this.repository.findByIdOrNumber(idOrNumber);
  }

  async createOrder(payload: CreateOrderInput) {
    const order = await this.repository.create(payload);
    return {
      id: order.id,
      order_number: order.order_number,
      total_amount: Number(order.total_amount),
    };
  }

  async updateOrderStatus(
    id: string,
    status?: OrderStatus,
    paymentStatus?: PaymentStatus,
  ) {
    const order = await this.repository.updateStatus(id, status, paymentStatus);
    return {
      affectedRows: 1,
    };
  }

  async deleteOrderItem(orderNumber: string, itemId: number) {
    return this.repository.deleteOrderItem(orderNumber, itemId);
  }

  async deleteOrder(orderNumber: string) {
    return this.repository.deleteOrder(orderNumber);
  }
}
