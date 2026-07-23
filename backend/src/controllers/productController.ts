import type { Request, Response } from "express";
import { z } from "zod";
import { productService } from "../config/services";
import { handleError, handleValidationError } from "../utils/errorHandler";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, is_active, search } = req.query;

    const products = await productService.getProducts({
      category: category ? String(category) : undefined,
      is_active:
        is_active !== undefined ? String(is_active) === "true" : undefined,
      search: search ? String(search) : undefined,
    });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    handleError(error, res, "fetching products");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    handleError(error, res, "fetching product");
  }
};

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock_quantity: z.number().int().nonnegative().optional(),
  category: z.string().optional(),
  image_url: z.string().url().optional(),
  sku: z.string().optional(),
  is_active: z.boolean().optional(),
  warranty_from: z.string().optional(),
  warranty_to: z.string().optional(),
  product_condition: z.enum(["new", "used"]).optional(),
});

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parseResult = productSchema.safeParse(req.body);

    if (!parseResult.success) {
      handleValidationError(res, "product payload", parseResult.error);
      return;
    }

    const result = await productService.createProduct(parseResult.data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        id: result.insertId,
        name: parseResult.data.name,
        price: parseResult.data.price,
      },
    });
  } catch (error) {
    handleError(error, res, "creating product");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = productSchema.safeParse(req.body);

    if (!parseResult.success) {
      handleValidationError(res, "product payload", parseResult.error);
      return;
    }

    const result = await productService.updateProduct(id, parseResult.data);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    handleError(error, res, "updating product");
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await productService.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    handleError(error, res, "fetching categories");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await productService.deleteProduct(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    handleError(error, res, "deleting product");
  }
};
