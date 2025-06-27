"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  customerName: string;
  total: string;
  date: string;
}

export function RecentOrdersTable() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/dashboard/recent-orders");
      const json = await res.json();
      setOrders(json);
    }
    fetchOrders();
  }, []);

  if (!orders || orders.length === 0) return <p>No recent orders.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-2">Customer</th>
            <th className="py-2">Total</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b last:border-none">
              <td className="py-2">{order.customerName}</td>
              <td className="py-2">{order.total}</td>
              <td className="py-2">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}