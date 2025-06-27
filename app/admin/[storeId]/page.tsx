import prismadb from "@/lib/prismadb";
import { SeedDemoButton } from "@/components/seed-demo-button";

interface DashboardProps {
  params: {
    storeId: string;
  };
}

export default async function DashboardPage({ params }: DashboardProps) {
  const storeId = params.storeId;

  const [store, productCount, orderCount, totalSales] = await Promise.all([
    prismadb.store.findUnique({ where: { id: storeId } }),
    prismadb.product.count({ where: { storeId } }),
    prismadb.order.count({ where: { storeId } }),
    prismadb.order.aggregate({
      _sum: {
        total: true,
      },
      where: { storeId },
    }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to {store?.name}
      </h1>
        <SeedDemoButton storeId={storeId} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-600">🛒 Products</h2>
          <p className="text-2xl font-semibold">{productCount}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-600">📦 Orders</h2>
          <p className="text-2xl font-semibold">{orderCount}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-600">📈 Total Sales</h2>
          <p className="text-2xl font-semibold">
            R{totalSales._sum.total?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
}