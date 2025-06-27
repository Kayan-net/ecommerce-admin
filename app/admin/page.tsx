import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ClientAdminHeader } from "./ClientAdminHeader";

export default async function AdminPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 space-y-8">
      {/* Header */}
      <ClientAdminHeader />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage your stores</p>
        </div>
        {/* StoreModal is now in ClientAdminHeader */}
      </div>

      {/* Store List */}
      {stores.length === 0 ? (
        <p className="text-sm text-muted-foreground">You haven&apos;t created any stores yet.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <a
              key={store.id}
              href={`/${store.id}`}
              className="border rounded-lg p-5 shadow-sm hover:shadow transition bg-white"
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">ID: {store.id}</p>
            </a>
          ))}
        </section>
      )}
    </main>
  );
}