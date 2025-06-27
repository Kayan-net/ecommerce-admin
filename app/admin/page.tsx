import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Stores</h1>
        <Link href="/admin/stores/new">
          <Button>+ Create New Store</Button>
        </Link>
      </div>

      {stores.length === 0 ? (
        <p className="text-muted-foreground">You don't have any stores yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/admin/${store.id}`}
              className="block bg-white shadow rounded p-4 border hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Store ID: {store.id}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}