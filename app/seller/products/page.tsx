import { Suspense } from "react";
import { getSellerProducts } from "@/actions/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Package,
  PlusCircle,
  Edit,
  Trash2,
  AlertCircle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { ProductActions } from "./product-actions";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  startDate: string;
  endDate: string;
  imageLink: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

function ProductCard({ product }: { product: Product }) {
  const now = new Date();
  const isActive =
    new Date(product.startDate) <= now && new Date(product.endDate) >= now;
  const isExpired = new Date(product.endDate) < now;
  const isUpcoming = new Date(product.startDate) > now;

  const getStatusColor = () => {
    if (isExpired) return "text-red-600 bg-red-50";
    if (isUpcoming) return "text-yellow-600 bg-yellow-50";
    if (isActive) return "text-green-600 bg-green-50";
    return "text-gray-600 bg-gray-50";
  };

  const getStatusText = () => {
    if (isExpired) return "Expired";
    if (isUpcoming) return "Upcoming";
    if (isActive) return "Active";
    return "Unknown";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}
              >
                {getStatusText()}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-medium">${product.price}</span>
                  {product.discountPrice && (
                    <span className="ml-2 text-green-600">
                      (Sale: ${product.discountPrice})
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  <span>Qty: {product.quantity}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(product.startDate).toLocaleDateString()} -{" "}
                    {new Date(product.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/seller/products/${product._id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            <ProductActions
              productId={product._id}
              productName={product.name}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function ProductsList() {
  const result = await getSellerProducts({});

  if (!result.data?.success || !result.data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <AlertCircle className="h-12 w-12 mb-4" />
        <h3 className="text-lg font-medium mb-2">Unable to load products</h3>
        <p>There was an error loading your products. Please try again.</p>
      </div>
    );
  }

  const { products } = result.data.data;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Package className="h-12 w-12 mb-4" />
        <h3 className="text-lg font-medium mb-2">No products yet</h3>
        <p className="mb-4">
          Start by adding your first product to the marketplace.
        </p>
        <Button asChild>
          <Link href="/seller/products/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Your First Product
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default function SellerProductsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>
        <Button asChild>
          <Link href="/seller/products/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Products List */}
      <Suspense
        fallback={
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <ProductsList />
      </Suspense>
    </div>
  );
}
