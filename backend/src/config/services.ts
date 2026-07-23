import { prisma } from './database';
import { ProductService } from '../services/productService';
import { OrderService } from '../services/orderService';

export const productService = new ProductService(prisma);
export const orderService = new OrderService(prisma);
