import { Suspense } from "react";
import { OverviewCards } from "@/components/dashboard/overview-cards";

import { RecentOrdersTable } from "@/components/dashboard/recent-orders";


export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Welcome 👋</h1>
        <p className="text-sm text-muted-foreground">Here’s how your store is doing today.</p>
      </div>

      <Suspense fallback={<p>Loading stats...</p>}>
        <OverviewCards />
      </Suspense>

      <Suspense fallback={<p>Loading orders...</p>}>
        <RecentOrdersTable />
      </Suspense>
    </div>
  );
}