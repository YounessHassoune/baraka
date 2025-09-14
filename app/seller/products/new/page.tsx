import { ProductForm } from "../product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600">
          Create a new product listing for your store
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <ProductForm />
      </div>
    </div>
  );
}
