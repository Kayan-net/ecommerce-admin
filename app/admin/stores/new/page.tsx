"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewStorePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.length < 2) return toast.error("Store name is too short");

    try {
      setLoading(true);
      const response = await axios.post("/api/stores", { name });
      router.push(`/admin/${response.data.id}`);
      toast.success("Store created!");
      
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a new store</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Store name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Store"}
        </Button>
      </form>
    </div>
  );
}