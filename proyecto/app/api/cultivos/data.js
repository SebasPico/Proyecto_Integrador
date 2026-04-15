const cultivos = [
  {
    id: "1",
    nombre: "Cafe Bourbon",
    tipo: "cafe",
    descripcion: "Cultivo de altura orientado a granos especiales para exportacion.",
    estado: "activo",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "2",
    nombre: "Cacao Trinitario",
    tipo: "cacao",
    descripcion: "Lote experimental para produccion de chocolate fino de aroma.",
    estado: "activo",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function listCultivos({ search = "", tipo = "", estado = "" } = {}) {
  const query = normalize(search);

  return cultivos
    .filter((item) => {
      const byName = !query || normalize(item.nombre).includes(query);
      const byType = !tipo || item.tipo === tipo;
      const byState = !estado || item.estado === estado;
      return byName && byType && byState;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getCultivoById(id) {
  return cultivos.find((item) => item.id === id) || null;
}

export function createCultivo(payload) {
  const timestamp = new Date().toISOString();

  const item = {
    id: makeId(),
    nombre: payload.nombre,
    tipo: payload.tipo,
    descripcion: payload.descripcion,
    estado: payload.estado,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  cultivos.push(item);
  return item;
}

export function updateCultivo(id, payload) {
  const index = cultivos.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated = {
    ...cultivos[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  cultivos[index] = updated;
  return updated;
}

export function softDeleteCultivo(id) {
  const cultivo = getCultivoById(id);
  if (!cultivo) return null;

  cultivo.estado = "inactivo";
  cultivo.updatedAt = new Date().toISOString();
  return cultivo;
}
