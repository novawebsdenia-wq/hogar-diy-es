"use client";

import { useState, type FormEvent } from "react";

export function NewsletterMidCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="my-10 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-2xl">✓</p>
        <p className="mt-2 font-bold text-green-800">
          ¡Apuntado! Te enviaremos la próxima guía.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl bg-[#0f3d26] p-6 text-white sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="shrink-0 text-3xl">🔧</div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Newsletter gratuito
          </p>
          <p className="mt-1 text-lg font-extrabold leading-snug">
            Recibe la próxima guía antes que nadie
          </p>
          <p className="mt-1 text-sm text-white/60">
            Sin spam. Solo cuando publiquemos algo útil.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 sm:w-52"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-600 disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Suscribirme"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs text-red-300">Error. Inténtalo de nuevo.</p>
        )}
      </div>
    </div>
  );
}
