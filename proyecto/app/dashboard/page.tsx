export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-cyan-50 via-white to-emerald-50 px-4">
      <section className="w-full max-w-2xl rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Sesion iniciada
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">
          Bienvenido. Este es tu panel principal despues de autenticarte.
        </p>
      </section>
    </main>
  );
}
