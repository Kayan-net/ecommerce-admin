import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) redirect("/stores");

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">🛍️ {store.name}</h2>
        <nav className="space-y-2">
          <a href={`/${store.id}`} className="block hover:text-sky-300">Overview</a>
          <a href={`/${store.id}/products`} className="block hover:text-sky-300">Products</a>
          <a href={`/${store.id}/orders`} className="block hover:text-sky-300">Orders</a>
          <a href={`/${store.id}/settings`} className="block hover:text-sky-300">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  );
}