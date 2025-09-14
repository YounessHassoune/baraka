"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct, updateProduct } from "@/actions/product";
import { toast } from "sonner";
import type { Product } from "@/types/product";

const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(100, "Product name cannot exceed 100 characters"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    discountPrice: z.coerce
      .number()
      .min(0, "Discount price must be positive")
      .optional()
      .or(z.literal("")),
    quantity: z.coerce
      .number()
      .int()
      .min(0, "Quantity must be a positive integer"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    imageLink: z.string().url("Invalid image URL"),
  })
  .refine(
    (data) => {
      if (
        data.discountPrice &&
        data.discountPrice !== "" &&
        data.discountPrice >= data.price
      ) {
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

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

export function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice || "",
          quantity: product.quantity,
          startDate: new Date(product.startDate).toISOString().split("T")[0],
          endDate: new Date(product.endDate).toISOString().split("T")[0],
          imageLink: product.imageLink,
        }
      : {
          name: "",
          price: 0,
          discountPrice: "",
          quantity: 0,
          startDate: "",
          endDate: "",
          imageLink: "",
        },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      const submitData = {
        ...data,
        discountPrice:
          data.discountPrice === "" ? undefined : Number(data.discountPrice),
      };

      let result;
      if (isEditing && product) {
        result = await updateProduct({ id: product._id, ...submitData });
      } else {
        result = await createProduct(submitData);
      }

      if (result.data?.success) {
        toast.success(
          isEditing
            ? "Product updated successfully"
            : "Product created successfully"
        );
        router.push("/seller/products");
        router.refresh();
      } else {
        toast.error(
          result.data?.error || result.serverError || "An error occurred"
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Product" : "Create New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Regular Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPrice">Sale Price ($) - Optional</Label>
              <Input
                id="discountPrice"
                type="number"
                step="0.01"
                {...register("discountPrice")}
                placeholder="0.00"
              />
              {errors.discountPrice && (
                <p className="text-sm text-red-600">
                  {errors.discountPrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity")}
              placeholder="0"
            />
            {errors.quantity && (
              <p className="text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
              {errors.endDate && (
                <p className="text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageLink">Image URL</Label>
            <Input
              id="imageLink"
              type="url"
              {...register("imageLink")}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageLink && (
              <p className="text-sm text-red-600">{errors.imageLink.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Product"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
