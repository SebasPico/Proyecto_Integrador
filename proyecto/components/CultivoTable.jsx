"use client";

export default function CultivoTable({ items, onEdit, onDelete, deletingId }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No hay cultivos que coincidan con los filtros.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Creado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((cultivo) => (
              <tr key={cultivo.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{cultivo.nombre}</td>
                <td className="px-4 py-3 capitalize text-slate-700">{cultivo.tipo}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      cultivo.estado === "activo"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {cultivo.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(cultivo.createdAt).toLocaleDateString("es-CO")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(cultivo.id)}
                      className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 font-medium text-sky-700 transition hover:bg-sky-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(cultivo)}
                      disabled={deletingId === cultivo.id}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {deletingId === cultivo.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
