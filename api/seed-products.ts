import prismadb from "@/lib/prismadb";

export async function GET() {
  const storeId = "cmcf2ow1d0000y30vj1xk3j3p";

  const products = await prismadb.product.createMany({
    data: [
      { name: "Travel Drone", price: 799.99, storeId },
      { name: "Foldable Travel Tripod", price: 59.95, storeId },
      { name: "Noise Cancelling Earbuds", price: 129.99, storeId },
      { name: "Ultra Travel Back Pack", price: 89.99, storeId },
      { name: "Travel Laptop Organizer", price: 49.99, storeId },
      { name: "Smart Power Adapter Kit", price: 24.95, storeId },
      { name: "RFID Passport Holder", price: 19.99, storeId },
      { name: "Travel Water Bottle", price: 24.99, storeId },
      { name: "Travel Adapter Kit", price: 34.99, storeId },
      { name: "Travel First Aid Kit", price: 29.99, storeId },


    ],
  });

  return Response.json({ success: true, count: products.count });
}