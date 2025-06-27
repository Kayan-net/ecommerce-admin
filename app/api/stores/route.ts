import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!name || name.trim().length < 2) {
      return new Response("Invalid store name", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name: name.trim(),
        userId,
      },
    });

    return Response.json(store);
  } catch (error) {
    console.error("[STORE_POST]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}