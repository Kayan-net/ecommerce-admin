"use client";

import { useEffect, useState } from "react";

interface Metrics {
  totalSales: string;
  orders: number;
  products: number;
}

export function OverviewCards() {
  const [data, setData] = useState<Metrics | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/dashboard/metrics");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-sm font-medium text-muted-foreground">Total Sales</h2>
        <p className="text-2xl font-bold mt-1">{data.totalSales}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-sm font-medium text-muted-foreground">Orders</h2>
        <p className="text-2xl font-bold mt-1">{data.orders}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-sm font-medium text-muted-foreground">Active Products</h2>
        <p className="text-2xl font-bold mt-1">{data.products}</p>
      </div>
    </div>
  );
}