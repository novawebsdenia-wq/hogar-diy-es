"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al suscribirse");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-xl bg-white/10 px-6 py-4 text-sm font-medium text-amber-300">
        ✓ ¡Apuntado! Te avisaremos cuando publiquemos nuevas guías.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:gap-2"
    >
      <input
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-900/30 transition-colors hover:bg-amber-600 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Suscribirme"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-300 sm:hidden">{errorMsg}</p>
      )}
    </form>
  );
}
