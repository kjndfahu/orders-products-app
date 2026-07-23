import { PrismaClient, Product, ProductCondition } from '@prisma/client';
import { BaseRepository } from './baseRepository';

export type ProductInput = {
  name: string;
  description?: string | null;
  price: number;
  stock_quantity?: number;
  category?: string | null;
  image_url?: string | null;
  sku?: string | null;
  is_active?: boolean;
  warranty_from?: string | null;
  warranty_to?: string | null;
  product_condition?: ProductCondition;
};

export type ProductFilters = {
  category?: string;
  is_active?: boolean;
  search?: string;
};

export class ProductRepository extends BaseRepository {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async findAll(filters: ProductFilters = {}): Promise<Product[]> {
    const where: any = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.is_active !== undefined) {
      where.is_active = filters.is_active;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
        { sku: { contains: filters.search } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(data: ProductInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock_quantity: data.stock_quantity ?? 0,
        category: data.category,
        image_url: data.image_url,
        sku: data.sku,
        is_active: data.is_active ?? true,
        warranty_from: data.warranty_from ? new Date(data.warranty_from) : null,
        warranty_to: data.warranty_to ? new Date(data.warranty_to) : null,
        product_condition: data.product_condition ?? 'new',
      },
    });
  }

  async update(id: string, data: ProductInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock_quantity: data.stock_quantity ?? 0,
        category: data.category,
        image_url: data.image_url,
        sku: data.sku,
        is_active: data.is_active ?? true,
        warranty_from: data.warranty_from ? new Date(data.warranty_from) : null,
        warranty_to: data.warranty_to ? new Date(data.warranty_to) : null,
        product_condition: data.product_condition ?? 'new',
      },
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }

  async findCategories(): Promise<string[]> {
    const products = await this.prisma.product.findMany({
      where: { category: { not: null } },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return products.map((p) => p.category as string);
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        stock_quantity: {
          increment: quantity,
        },
      },
    });
  }
}
