// /app/api/seed-products/route.ts
import prismadb from "@/lib/prismadb";

export async function GET() {
  const storeId = "cmcf2ow1d0000y30vj1xk3j3p";

  await prismadb.product.createMany({
    data: [
      { name: "Travel Drone", price: 749.99, storeId },
      { name: "Waterproof Power Bank", price: 69.0, storeId },
    ],
  });

  await prismadb.order.createMany({
    data: [
      { total: 749.99, storeId },
      { total: 69.0, storeId },
    ],
  });

  return Response.json({ success: true });
}