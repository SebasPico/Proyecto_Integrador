import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(20,184,166,0.2),transparent_35%)]" />

      <section className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:p-8">
        <div className="mb-8 space-y-3 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-teal-500 text-xl font-extrabold text-white shadow-lg shadow-sky-300/50">
            PI
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sistema de Acceso
          </h1>
          <p className="text-sm text-slate-600">
            Inicia sesion para acceder a tu dashboard.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
