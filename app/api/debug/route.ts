import prismadb from "@/lib/prismadb";

export async function GET() {
  const stores = await prismadb.store.findMany();
  return Response.json(stores);
}