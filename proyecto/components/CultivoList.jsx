"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CultivoTable from "./CultivoTable";
import { deleteCultivo, getCultivos } from "@/lib/cultivosApi";

const TOAST_INITIAL = {
  show: false,
  type: "success",
  message: "",
};

const FILTER_OPTIONS = {
  tipos: ["", "cafe", "cacao", "citricos", "frutales", "hortalizas"],
  estados: ["", "activo", "inactivo"],
};

export default function CultivoList() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    tipo: "",
    estado: "",
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [toast, setToast] = useState(TOAST_INITIAL);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const loadCultivos = async () => {
    setLoading(true);
    try {
      const data = await getCultivos(filters);
      setItems(data.items || []);
    } catch (error) {
      showToast("error", error.message || "No se pudo cargar la lista de cultivos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCultivos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.tipo, filters.estado]);

  useEffect(() => {
    if (!toast.show) return;

    const id = setTimeout(() => {
      setToast(TOAST_INITIAL);
    }, 3000);

    return () => clearTimeout(id);
  }, [toast]);

  const headerStats = useMemo(() => {
    const activos = items.filter((item) => item.estado === "activo").length;
    return {
      total: items.length,
      activos,
      inactivos: items.length - activos,
    };
  }, [items]);

  const handleDelete = async () => {
    if (!confirmTarget) return;

    setDeletingId(confirmTarget.id);

    try {
      const data = await deleteCultivo(confirmTarget.id);
      showToast("success", data.message || "Cultivo inactivado correctamente.");
      setConfirmTarget(null);
      await loadCultivos();
    } catch (error) {
      showToast("error", error.message || "No fue posible eliminar el cultivo.");
    } finally {
      setDeletingId("");
    }
  };

  const handleChangeFilter = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Panel Administrador
            </p>
            <h1 className="text-2xl font-bold text-slate-900">Gestion de cultivos</h1>
          </div>
          <Link
            href="/administrador/cultivos/nuevo"
            className="rounded-xl bg-sky-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
          >
            + Crear cultivo
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{headerStats.total}</p>
          </article>
          <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs uppercase tracking-wide text-emerald-700">Activos</p>
            <p className="mt-1 text-2xl font-bold text-emerald-800">{headerStats.activos}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-600">Inactivos</p>
            <p className="mt-1 text-2xl font-bold text-slate-700">{headerStats.inactivos}</p>
          </article>
        </div>
      </header>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChangeFilter}
            placeholder="Buscar por nombre"
            className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />

          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleChangeFilter}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 capitalize outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          >
            {FILTER_OPTIONS.tipos.map((tipo) => (
              <option key={tipo || "all"} value={tipo} className="capitalize">
                {tipo || "Todos los tipos"}
              </option>
            ))}
          </select>

          <select
            name="estado"
            value={filters.estado}
            onChange={handleChangeFilter}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 capitalize outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          >
            {FILTER_OPTIONS.estados.map((estado) => (
              <option key={estado || "all"} value={estado} className="capitalize">
                {estado || "Todos los estados"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">
          Cargando cultivos...
        </div>
      ) : (
        <CultivoTable
          items={items}
          deletingId={deletingId}
          onEdit={(id) => router.push(`/administrador/cultivos/editar/${id}`)}
          onDelete={(item) => setConfirmTarget(item)}
        />
      )}

      {confirmTarget ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/45 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Confirmar eliminacion</h3>
            <p className="mt-2 text-sm text-slate-600">
              Se marcara como inactivo el cultivo <strong>{confirmTarget.nombre}</strong>. Esta accion
              puede revertirse editando su estado.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast.show ? (
        <div className="fixed right-4 top-4 z-50 animate-pulse rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-xl transition">
          <div
            className={`rounded-xl px-4 py-3 ${
              toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </section>
  );
}
