const API_BASE = "/api/cultivos";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || "Ocurrio un error en la solicitud.";
    const error = new Error(message);
    error.status = response.status;
    error.errors = data.errors || null;
    throw error;
  }

  return data;
}

export async function getCultivos(filters = {}) {
  const query = new URLSearchParams();

  if (filters.search) query.set("search", filters.search);
  if (filters.tipo) query.set("tipo", filters.tipo);
  if (filters.estado) query.set("estado", filters.estado);

  const response = await fetch(`${API_BASE}?${query.toString()}`, {
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function getCultivoById(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function createCultivo(payload) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function updateCultivo(id, payload) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function deleteCultivo(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}
