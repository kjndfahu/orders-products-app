import { PrismaClient } from '@prisma/client';
import { ProductRepository, type ProductInput, type ProductFilters } from '../repositories/productRepository';

export class ProductService {
  private repository: ProductRepository;

  constructor(prisma: PrismaClient) {
    this.repository = new ProductRepository(prisma);
  }

  async getProducts(filters: ProductFilters = {}) {
    const products = await this.repository.findAll(filters);
    return products.map((p) => ({
      ...p,
      price: Number(p.price),
    }));
  }

  async getProductById(id: string) {
    const product = await this.repository.findById(id);
    if (!product) {
      return null;
    }
    return {
      ...product,
      price: Number(product.price),
    };
  }

  async createProduct(payload: ProductInput) {
    const product = await this.repository.create(payload);
    return {
      insertId: product.id,
      affectedRows: 1,
    };
  }

  async updateProduct(id: string, payload: ProductInput) {
    await this.repository.update(id, payload);
    return {
      affectedRows: 1,
    };
  }

  async deleteProduct(id: string) {
    await this.repository.delete(id);
    return {
      affectedRows: 1,
    };
  }

  async getCategories() {
    return this.repository.findCategories();
  }
}
