import prismadb from "@/lib/prismadb";

export async function GET() {
  const store = await prismadb.store.create({
    data: {
      name: "Debug Store",
      userId: "user_123testabc", // replace with real Clerk ID
    },
  });

  return Response.json(store);
}