"use client";

import { useState } from "react";

const DEFAULT_VALUES = {
  nombre: "",
  tipo: "cafe",
  descripcion: "",
  estado: "activo",
};

const TIPOS = ["cafe", "cacao", "citricos", "frutales", "hortalizas"];

function validate(values) {
  const errors = {};

  if (!values.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (values.nombre.trim().length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!values.tipo.trim()) {
    errors.tipo = "El tipo es obligatorio.";
  } else if (values.tipo.trim().length < 3) {
    errors.tipo = "El tipo debe tener al menos 3 caracteres.";
  }

  if (!values.descripcion.trim()) {
    errors.descripcion = "La descripcion es obligatoria.";
  } else if (values.descripcion.trim().length < 10) {
    errors.descripcion = "La descripcion debe tener al menos 10 caracteres.";
  }

  if (!["activo", "inactivo"].includes(values.estado)) {
    errors.estado = "Selecciona un estado valido.";
  }

  return errors;
}

export default function CultivoForm({
  initialData,
  onSubmit,
  submitLabel = "Guardar cultivo",
  loading = false,
}) {
  const [values, setValues] = useState({ ...DEFAULT_VALUES, ...(initialData || {}) });
  const [touched, setTouched] = useState({});
  const [apiErrors, setApiErrors] = useState({});

  const clientErrors = validate(values);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (apiErrors[name]) {
      setApiErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const touchAll = {
      nombre: true,
      tipo: true,
      descripcion: true,
      estado: true,
    };

    setTouched(touchAll);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    const result = await onSubmit(values);

    if (result?.errors) {
      setApiErrors(result.errors);
    }
  };

  const getFieldError = (name) => {
    if (apiErrors[name]) return apiErrors[name];
    if (!touched[name]) return "";
    return clientErrors[name] || "";
  };

  const fieldClass = (name) => {
    const hasError = Boolean(getFieldError(name));
    const hasSuccess = touched[name] && !hasError && values[name]?.trim?.();

    if (hasError) return "border-red-500 ring-red-100";
    if (hasSuccess) return "border-emerald-500 ring-emerald-100";
    return "border-slate-300 ring-transparent";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="nombre">
          Nombre del cultivo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Cafe Geisha"
          className={`w-full rounded-xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${fieldClass("nombre")}`}
        />
        <p className="mt-1 min-h-5 text-sm text-red-600">{getFieldError("nombre")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="tipo">
            Tipo de cultivo
          </label>
          <select
            id="tipo"
            name="tipo"
            value={values.tipo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${fieldClass("tipo")}`}
          >
            {TIPOS.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <p className="mt-1 min-h-5 text-sm text-red-600">{getFieldError("tipo")}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="estado">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={values.estado}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${fieldClass("estado")}`}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <p className="mt-1 min-h-5 text-sm text-red-600">{getFieldError("estado")}</p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="descripcion">
          Descripcion
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={4}
          value={values.descripcion}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Describe el cultivo, ubicacion, objetivos y observaciones..."
          className={`w-full rounded-xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-4 ${fieldClass("descripcion")}`}
        />
        <p className="mt-1 min-h-5 text-sm text-red-600">{getFieldError("descripcion")}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
