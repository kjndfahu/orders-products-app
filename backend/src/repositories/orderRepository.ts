import { PrismaClient, Order, OrderStatus, PaymentStatus } from '@prisma/client';
import { BaseRepository } from './baseRepository';

export type OrderFilters = {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  customer_email?: string;
};

export type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  sku?: string | null;
  image_url?: string | null;
  category?: string | null;
  warranty_from?: Date | null;
  warranty_to?: Date | null;
  product_condition?: 'new' | 'used' | null;
};

export type OrderWithItems = Omit<Order, 'total_amount'> & {
  total_amount: number;
  items: OrderItem[];
};

export type CreateOrderItem = {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
};

export type CreateOrderInput = {
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  shipping_address: string;
  billing_address?: string | null;
  payment_method?: string | null;
  items: CreateOrderItem[];
  notes?: string | null;
};

export class OrderRepository extends BaseRepository {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async findAll(filters: OrderFilters = {}): Promise<OrderWithItems[]> {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.payment_status) {
      where.payment_status = filters.payment_status;
    }

    if (filters.customer_email) {
      where.customer_email = {
        contains: filters.customer_email,
      };
    }

    const orders = await this.prisma.order.findMany({
      where,
      include: {
        order_items: {
          include: {
            product: {
              select: {
                sku: true,
                image_url: true,
                category: true,
                warranty_from: true,
                warranty_to: true,
                product_condition: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return orders.map((order) => ({
      ...order,
      total_amount: Number(order.total_amount),
      items: order.order_items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: Number(item.product_price),
        quantity: item.quantity,
        subtotal: Number(item.subtotal),
        sku: item.product?.sku,
        image_url: item.product?.image_url,
        category: item.product?.category,
        warranty_from: item.product?.warranty_from,
        warranty_to: item.product?.warranty_to,
        product_condition: item.product?.product_condition,
      })),
    }));
  }

  async findByIdOrNumber(idOrNumber: string): Promise<OrderWithItems | null> {
    const numericId = Number(idOrNumber);
    const whereClause: any = {};
    
    if (!isNaN(numericId)) {
      whereClause.OR = [
        { id: numericId },
        { order_number: idOrNumber },
      ];
    } else {
      whereClause.order_number = idOrNumber;
    }
    
    const order = await this.prisma.order.findFirst({
      where: whereClause,
      include: {
        order_items: {
          include: {
            product: {
              select: {
                sku: true,
                image_url: true,
                category: true,
                warranty_from: true,
                warranty_to: true,
                product_condition: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return {
      ...order,
      total_amount: Number(order.total_amount),
      items: order.order_items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: Number(item.product_price),
        quantity: item.quantity,
        subtotal: Number(item.subtotal),
        sku: item.product?.sku,
        image_url: item.product?.image_url,
        category: item.product?.category,
        warranty_from: item.product?.warranty_from,
        warranty_to: item.product?.warranty_to,
        product_condition: item.product?.product_condition,
      })),
    };
  }

  async create(payload: CreateOrderInput): Promise<Order> {
    return this.prisma.$transaction(async (tx) => {
      const orderNumber = `ORD-${new Date().getFullYear()}-${Date.now()}`;

      const totalAmount = payload.items.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0,
      );

      const order = await tx.order.create({
        data: {
          order_number: orderNumber,
          customer_name: payload.customer_name,
          customer_email: payload.customer_email,
          customer_phone: payload.customer_phone,
          shipping_address: payload.shipping_address,
          billing_address: payload.billing_address || payload.shipping_address,
          total_amount: totalAmount,
          payment_method: payload.payment_method,
          notes: payload.notes,
          order_items: {
            create: payload.items.map((item) => ({
              product_id: item.product_id,
              product_name: item.product_name,
              product_price: item.product_price,
              quantity: item.quantity,
              subtotal: item.product_price * item.quantity,
            })),
          },
        },
      });

      for (const item of payload.items) {
        await tx.product.update({
          where: { id: item.product_id },
          data: {
            stock_quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });
  }

  async updateStatus(
    id: string,
    status?: OrderStatus,
    paymentStatus?: PaymentStatus,
  ): Promise<Order> {
    const data: any = {};

    if (status) {
      data.status = status;
    }

    if (paymentStatus) {
      data.payment_status = paymentStatus;
    }

    return this.prisma.order.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteOrderItem(orderNumber: string, itemId: number): Promise<{
    found: boolean;
    deleted: boolean;
  }> {
    return this.prisma.$transaction(async (tx) => {
      const numericId = Number(orderNumber);
      const whereClause: any = {};
      
      if (!isNaN(numericId)) {
        whereClause.OR = [
          { id: numericId },
          { order_number: orderNumber },
        ];
      } else {
        whereClause.order_number = orderNumber;
      }
      
      const order = await tx.order.findFirst({
        where: whereClause,
      });

      if (!order) {
        return { found: false, deleted: false };
      }

      const orderItem = await tx.orderItem.findFirst({
        where: {
          id: itemId,
          order_id: order.id,
        },
      });

      if (!orderItem) {
        return { found: true, deleted: false };
      }

      await tx.orderItem.delete({
        where: { id: itemId },
      });

      await tx.product.update({
        where: { id: orderItem.product_id },
        data: {
          stock_quantity: {
            increment: orderItem.quantity,
          },
        },
      });

      await tx.order.update({
        where: { id: order.id },
        data: {
          total_amount: {
            decrement: Number(orderItem.subtotal),
          },
        },
      });

      return { found: true, deleted: true };
    });
  }
}
