import { Suspense } from "react";
import { getSellerProducts } from "@/actions/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Package,
  PlusCircle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";

async function DashboardStats() {
  const result = await getSellerProducts({});

  if (!result.data?.success || !result.data?.data) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Unable to load data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { products } = result.data.data;
  const totalProducts = products.length;
  const activeProducts = products.filter((product: any) => {
    const now = new Date();
    return (
      new Date(product.startDate) <= now && new Date(product.endDate) >= now
    );
  }).length;
  const inStockProducts = products.filter(
    (product: any) => product.quantity > 0
  ).length;
  const totalValue = products.reduce(
    (sum: number, product: any) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            {activeProducts} currently active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Stock</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inStockProducts}</div>
          <p className="text-xs text-muted-foreground">
            {totalProducts - inStockProducts} out of stock
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Total inventory value</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProducts}</div>
          <p className="text-xs text-muted-foreground">Currently running</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function RecentProducts() {
  const result = await getSellerProducts({ limit: 5 });

  if (!result.data?.success || !result.data?.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mr-2" />
            Unable to load recent products
          </div>
        </CardContent>
      </Card>
    );
  }

  const { products } = result.data.data;

  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Package className="h-8 w-8 mb-2" />
            <p>No products yet</p>
            <Button asChild className="mt-4">
              <Link href="/seller/products/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Your First Product
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product: any) => (
            <div key={product._id} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">
                  ${product.price} • Qty: {product.quantity}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/seller/products/${product._id}/edit`}>
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/seller/products">View All Products</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600">
            Manage your products and track your business
          </p>
        </div>
        <Button asChild>
          <Link href="/seller/products/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Loading...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">Loading...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      {/* Recent Products */}
      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                Loading...
              </div>
            </CardContent>
          </Card>
        }
      >
        <RecentProducts />
      </Suspense>
    </div>
  );
}
