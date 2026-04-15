"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Input from "./Input";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const getFieldError = (field, value) => {
    if (!value) {
      return field === "email" ? "El correo es obligatorio" : "La contraseña es obligatoria";
    }

    if (field === "email" && !EMAIL_REGEX.test(value)) {
      return "Correo invalido";
    }

    return "";
  };

  const errors = {
    email: touched.email ? getFieldError("email", formData.email.trim()) : "",
    password: touched.password ? getFieldError("password", formData.password) : "",
  };

  const hasClientErrors = Boolean(
    getFieldError("email", formData.email.trim()) || getFieldError("password", formData.password),
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (serverError) {
      setServerError("");
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({ email: true, password: true });

    if (hasClientErrors) {
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "No fue posible iniciar sesion.");
        return;
      }

      const storage = formData.remember ? window.localStorage : window.sessionStorage;
      storage.setItem("auth_token", data.token || "demo-token");
      storage.setItem("auth_user", JSON.stringify(data.user));

      const roleRedirect = {
        administrador: "/administrador",
        productor: "/productor",
        "asistente-tecnico": "/asistente-tecnico",
      };

      router.push(data.redirectTo || roleRedirect[data?.user?.role] || "/dashboard");
    } catch {
      setServerError("Error de conexion. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const emailIsValid = formData.email.length > 0 && !getFieldError("email", formData.email.trim());
  const passwordIsValid =
    formData.password.length > 0 && !getFieldError("password", formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        id="email"
        label="Correo electronico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="ejemplo@empresa.com"
        autoComplete="email"
        error={errors.email}
        success={touched.email && emailIsValid}
      />

      <Input
        id="password"
        label="Contrasena"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ingresa tu contrasena"
        autoComplete="current-password"
        error={errors.password}
        success={touched.password && passwordIsValid}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        }
      />

      <div className="flex items-center justify-between text-sm">
        <label htmlFor="remember" className="inline-flex items-center gap-2 text-slate-600">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          Recordar sesion
        </label>
        <a href="#" className="font-semibold text-sky-700 hover:text-sky-800 hover:underline">
          Olvidaste tu contrasena?
        </a>
      </div>

      {serverError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </p>
      ) : null}

      <Button loading={loading} disabled={loading}>
        Iniciar sesion
      </Button>

      <p className="text-center text-xs text-slate-500">
        Demo Admin: admin@agrocontrol.com / Admin2026*
      </p>
    </form>
  );
}
