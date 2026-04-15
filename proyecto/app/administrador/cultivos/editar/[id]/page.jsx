"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CultivoForm from "@/components/CultivoForm";
import { getCultivoById, updateCultivo } from "@/lib/cultivosApi";

const TOAST_RESET = { show: false, type: "success", message: "" };

export default function EditarCultivoAdministradorPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [cultivo, setCultivo] = useState(null);
  const [toast, setToast] = useState(TOAST_RESET);

  const id = params?.id;

  useEffect(() => {
    async function loadCultivo() {
      if (!id) return;

      setLoadingData(true);

      try {
        const data = await getCultivoById(id);
        setCultivo(data.item || null);
      } catch (error) {
        setToast({
          show: true,
          type: "error",
          message: error.message || "No se pudo cargar el cultivo.",
        });
      } finally {
        setLoadingData(false);
      }
    }

    loadCultivo();
  }, [id]);

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => setToast(TOAST_RESET), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (values) => {
    if (!id) return null;
    setLoading(true);

    try {
      const data = await updateCultivo(id, values);
      setToast({
        show: true,
        type: "success",
        message: data.message || "Cultivo actualizado correctamente.",
      });
      setTimeout(() => router.push("/administrador/cultivos"), 700);
      return null;
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: error.message || "No fue posible actualizar el cultivo.",
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
            <h1 className="text-2xl font-bold text-slate-900">Editar cultivo</h1>
          </div>
          <Link
            href="/administrador/cultivos"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Volver
          </Link>
        </div>

        {loadingData ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
            Cargando datos del cultivo...
          </div>
        ) : cultivo ? (
          <CultivoForm
            key={cultivo.id}
            initialData={cultivo}
            submitLabel="Guardar cambios"
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
            No se encontro el cultivo solicitado.
          </div>
        )}
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
