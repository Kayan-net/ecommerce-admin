"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export function SeedDemoButton({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seed-products", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        toast.success("Seeded products and orders! 🎉");
        location.reload(); // Refresh to show new data
      } else {
        toast.error("Seeding failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? "Seeding..." : "Seed Demo Data"}
    </Button>
  );
}