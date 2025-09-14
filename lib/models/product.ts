import { Schema, model, models, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  imageLink: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price must be a positive number"],
      validate: {
        validator: function (this: IProduct, value: number) {
          return !value || value < this.price;
        },
        message: "Discount price must be less than regular price",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be a positive number"],
      default: 0,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (this: IProduct, value: Date) {
          return value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    imageLink: {
      type: String,
      required: [true, "Image link is required"],
      trim: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ProductSchema.index({ startDate: 1, endDate: 1 });
ProductSchema.index({ name: 1 });
ProductSchema.index({ sellerId: 1 });

export const Product =
  models.Product || model<IProduct>("Product", ProductSchema);
