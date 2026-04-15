import Link from "next/link";

const servicios = [
  {
    nombre: "MS-Autenticacion",
    descripcion: "Gestiona inicio de sesion, roles y permisos del sistema.",
    estado: "operativo",
  },
  {
    nombre: "MS-Cultivos",
    descripcion: "Administra registro, edicion y estado de los cultivos.",
    estado: "operativo",
  },
  {
    nombre: "MS-Notificaciones",
    descripcion: "Envia alertas y eventos de cambios en modulos administrativos.",
    estado: "degradado",
  },
];

const modulos = [
  {
    titulo: "Gestionar cultivos",
    descripcion: "Crea, edita, filtra y cambia estado de cultivos registrados.",
    href: "/administrador/cultivos",
    cta: "Ir a cultivos",
    color: "from-emerald-500 to-teal-500",
  },
  {
    titulo: "Usuarios y roles",
    descripcion: "Control de acceso por actor: administrador, productor y asistente tecnico.",
    href: "/administrador",
    cta: "Proximamente",
    color: "from-sky-500 to-cyan-500",
  },
  {
    titulo: "Reportes operativos",
    descripcion: "Indicadores por microservicio para monitoreo administrativo.",
    href: "/administrador",
    cta: "Proximamente",
    color: "from-orange-500 to-amber-500",
  },
];

function estadoClass(estado) {
  return estado === "operativo"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";
}

export default function AdministradorDashboardPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-white to-cyan-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Dashboard Administrador
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Centro de gestion agricola
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Vista principal basada en microservicios para coordinar operaciones, monitorear
                servicios y administrar modulos criticos del sistema.
              </p>
            </div>
            <Link
              href="/administrador/cultivos/nuevo"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Crear cultivo rapido
            </Link>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <article
              key={servicio.nombre}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                  {servicio.nombre}
                </h2>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${estadoClass(servicio.estado)}`}>
                  {servicio.estado}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{servicio.descripcion}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Modulos administrativos</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Arquitectura orientada a microservicios
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modulos.map((modulo) => (
              <article
                key={modulo.titulo}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`h-2 w-16 rounded-full bg-linear-to-r ${modulo.color}`} />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{modulo.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{modulo.descripcion}</p>
                <Link
                  href={modulo.href}
                  className="mt-5 inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  {modulo.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
