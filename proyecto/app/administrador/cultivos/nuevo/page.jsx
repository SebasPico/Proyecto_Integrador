"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CultivoForm from "@/components/CultivoForm";
import { createCultivo } from "@/lib/cultivosApi";

export default function NuevoCultivoAdministradorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => setToast({ show: false, type: "success", message: "" }), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const data = await createCultivo(values);
      setToast({
        show: true,
        type: "success",
        message: data.message || "Cultivo creado correctamente.",
      });

      setTimeout(() => router.push("/administrador/cultivos"), 700);
      return null;
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: error.message || "No fue posible crear el cultivo.",
      });

      return error.status === 400 ? { errors: error.errors || {} } : null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Administrador
            </p>
            <h1 className="text-2xl font-bold text-slate-900">Crear nuevo cultivo</h1>
          </div>
          <Link
            href="/administrador/cultivos"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Volver
          </Link>
        </div>

        <CultivoForm submitLabel="Crear cultivo" onSubmit={handleSubmit} loading={loading} />
      </div>

      {toast.show ? (
        <div className="fixed right-4 top-4 z-50 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-xl">
          <div className={`rounded-xl px-4 py-3 ${toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"}`}>
            {toast.message}
          </div>
        </div>
      ) : null}
    </main>
  );
}
