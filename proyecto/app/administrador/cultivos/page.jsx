import CultivoList from "@/components/CultivoList";

export const metadata = {
  title: "Cultivos | Administrador",
};

export default function CultivosAdministradorPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <CultivoList />
      </div>
    </main>
  );
}
