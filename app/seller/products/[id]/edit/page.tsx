import { notFound } from "next/navigation";
import { getProduct } from "@/actions/product";
import { ProductForm } from "../../product-form";
import { requireSeller } from "@/lib/auth-utils";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await requireSeller();

  const result = await getProduct({ id: params.id });

  if (!result.data?.success || !result.data?.data) {
    notFound();
  }

  const product = result.data.data;

  // Check if the product belongs to the current seller
  if (product.sellerId !== session.userId) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600">Update your product listing</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <ProductForm product={product} isEditing={true} />
      </div>
    </div>
  );
}
