import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET() {
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const stores = await prismadb.store.findMany({
    where: { userId },
    include: {
      products: true,
      orders: true,
    },
  });

  const totalOrders = stores.flatMap((s) => s.orders).length;
  const totalProducts = stores.flatMap((s) => s.products).length;
  const totalRevenue = stores
    .flatMap((s) => s.orders)
    .reduce((acc, order) => acc + Number(order.total), 0);

  return Response.json({
    totalSales: `R${totalRevenue.toFixed(2)}`,
    orders: totalOrders,
    products: totalProducts,
  });
}