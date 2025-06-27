"use client";

import { useAuth, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-sky-700 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-5xl font-extrabold">
            Power Your Store with <span className="text-sky-300">K Admin</span>
          </h1>
          <p className="text-lg text-sky-100">
            Manage your products, orders, and analytics — all in one seamless dashboard.
          </p>

          {isSignedIn ? (
            <div className="space-y-3">
              <button
                onClick={() => router.push("/admin")}
                className="bg-white text-indigo-900 px-6 py-2 rounded font-semibold shadow hover:bg-slate-100 transition"
              >
                Go to Admin Dashboard
              </button>
              <SignOutButton>
                <button className="text-sm underline text-sky-300">Sign out</button>
              </SignOutButton>
            </div>
          ) : (
            <a
              href="/sign-in"
              className="bg-white text-indigo-900 px-6 py-2 rounded font-semibold shadow hover:bg-slate-100 transition"
            >
              Get Started
            </a>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose K Admin?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">🛍️ Multi-Store Support</h3>
              <p className="text-sm text-muted-foreground">Create, manage, and switch between multiple stores with ease.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">📦 Product Management</h3>
              <p className="text-sm text-muted-foreground">Organize products across categories and control inventory effortlessly.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">📈 Real-Time Insights</h3>
              <p className="text-sm text-muted-foreground">Track orders, performance metrics, and growth trends instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-sky-50 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <blockquote className="text-lg italic text-sky-900">
            “K Admin transformed how I run my eCommerce business. Clean, fast, and incredibly powerful.”
          </blockquote>
          <p className="font-semibold text-sky-600">— Happy Store Owner</p>
          {!isSignedIn && (
            <a
              href="/sign-in"
              className="inline-block mt-6 bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
            >
              Get Started Free
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} K Admin. Crafted with care for creators and sellers.
      </footer>
    </div>
  );
}