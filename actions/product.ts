"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { Product } from "@/lib/models/product";
import dbConnect from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import type { ActionResponse } from "@/types/actions";

// Validation schemas
const createProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(100, "Product name cannot exceed 100 characters"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    discountPrice: z
      .number()
      .min(0, "Discount price must be positive")
      .optional(),
    quantity: z.number().int().min(0, "Quantity must be a positive integer"),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
    imageLink: z.string().url("Invalid image URL"),
  })
  .refine(
    (data) => {
      if (data.discountPrice && data.discountPrice >= data.price) {
        return false;
      }
      return true;
    },
    {
      message: "Discount price must be less than regular price",
      path: ["discountPrice"],
    }
  )
  .refine(
    (data) => {
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

const updateProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters")
    .optional(),
  price: z.number().min(0.01, "Price must be greater than 0").optional(),
  discountPrice: z
    .number()
    .min(0, "Discount price must be positive")
    .optional(),
  quantity: z
    .number()
    .int()
    .min(0, "Quantity must be a positive integer")
    .optional(),
  startDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  imageLink: z.string().url("Invalid image URL").optional(),
});

const deleteProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
});

const getProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
});

const getProductsSchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  inStock: z.boolean().optional(),
  active: z.boolean().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

// Create product action
export const createProduct = actionClient
  .inputSchema(createProductSchema)
  .action(async ({ parsedInput: input }): Promise<ActionResponse<any>> => {
    try {
      await dbConnect();

      const product = await Product.create(input);

      revalidatePath("/products");

      return {
        success: true,
        data: JSON.parse(JSON.stringify(product)),
      };
    } catch (error) {
      console.error("Error creating product:", error);

      if (error instanceof Error && error.message.includes("duplicate key")) {
        return {
          success: false,
          error: "A product with this name already exists",
        };
      }

      return {
        success: false,
        error: "Failed to create product. Please try again.",
      };
    }
  });

// Get all products action
export const getProducts = actionClient
  .inputSchema(getProductsSchema)
  .action(async ({ parsedInput: input }): Promise<ActionResponse<any>> => {
    try {
      await dbConnect();

      const { search, minPrice, maxPrice, inStock, active, page, limit } =
        input;
      const skip = (page - 1) * limit;

      // Build query
      const query: any = {};

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) query.price.$gte = minPrice;
        if (maxPrice !== undefined) query.price.$lte = maxPrice;
      }

      if (inStock !== undefined) {
        query.quantity = inStock ? { $gt: 0 } : { $eq: 0 };
      }

      if (active !== undefined) {
        const now = new Date();
        if (active) {
          query.startDate = { $lte: now };
          query.endDate = { $gte: now };
        } else {
          query.$or = [{ startDate: { $gt: now } }, { endDate: { $lt: now } }];
        }
      }

      const [products, total] = await Promise.all([
        Product.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Product.countDocuments(query),
      ]);

      return {
        success: true,
        data: {
          products: JSON.parse(JSON.stringify(products)),
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return {
        success: false,
        error: "Failed to fetch products. Please try again.",
      };
    }
  });

// Get single product action
export const getProduct = actionClient
  .inputSchema(getProductSchema)
  .action(async ({ parsedInput: input }): Promise<ActionResponse<any>> => {
    try {
      await dbConnect();

      const product = await Product.findById(input.id).lean();

      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }

      return {
        success: true,
        data: JSON.parse(JSON.stringify(product)),
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      return {
        success: false,
        error: "Failed to fetch product. Please try again.",
      };
    }
  });

// Update product action
export const updateProduct = actionClient
  .inputSchema(updateProductSchema)
  .action(async ({ parsedInput: input }): Promise<ActionResponse<any>> => {
    try {
      await dbConnect();

      const { id, ...updateData } = input;

      // Validate discount price against regular price if both are being updated
      if (
        updateData.discountPrice !== undefined &&
        updateData.price !== undefined
      ) {
        if (updateData.discountPrice >= updateData.price) {
          return {
            success: false,
            error: "Discount price must be less than regular price",
          };
        }
      }

      // Validate dates if both are being updated
      if (updateData.startDate && updateData.endDate) {
        if (new Date(updateData.endDate) <= new Date(updateData.startDate)) {
          return {
            success: false,
            error: "End date must be after start date",
          };
        }
      }

      const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).lean();

      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }

      revalidatePath("/products");
      revalidatePath(`/products/${id}`);

      return {
        success: true,
        data: JSON.parse(JSON.stringify(product)),
      };
    } catch (error) {
      console.error("Error updating product:", error);
      return {
        success: false,
        error: "Failed to update product. Please try again.",
      };
    }
  });

// Delete product action
export const deleteProduct = actionClient
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput: input }): Promise<ActionResponse<any>> => {
    try {
      await dbConnect();

      const product = await Product.findByIdAndDelete(input.id).lean();

      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }

      revalidatePath("/products");

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error deleting product:", error);
      return {
        success: false,
        error: "Failed to delete product. Please try again.",
      };
    }
  });
