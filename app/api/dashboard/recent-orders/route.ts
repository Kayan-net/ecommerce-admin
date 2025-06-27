import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get all store IDs for the current user
    const stores = await prismadb.store.findMany({
      where: { userId },
      select: { id: true },
    });

    const storeIds = stores.map((store) => store.id);

    // Fetch recent orders across all stores owned by this user
    const orders = await prismadb.order.findMany({
      where: {
        storeId: {
          in: storeIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        customer: true, // ensure your Order model has a relation to Customer
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      customerName: order.customer?.name || "Guest",
      total: `R${Number(order.total || 0).toFixed(2)}`,
      date: format(order.createdAt, "dd MMM yyyy"),
    }));

    return new Response(JSON.stringify(formattedOrders), { status: 200 });
  } catch (error) {
    console.error("[DASHBOARD_ORDERS]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}