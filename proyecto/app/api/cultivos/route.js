import { NextResponse } from "next/server";
import { createCultivo, listCultivos } from "./data";

function validate(payload) {
  const errors = {};

  if (!payload?.nombre || payload.nombre.trim().length < 3) {
    errors.nombre = "El nombre es obligatorio y debe tener al menos 3 caracteres.";
  }

  if (!payload?.tipo || payload.tipo.trim().length < 3) {
    errors.tipo = "El tipo es obligatorio y debe tener al menos 3 caracteres.";
  }

  if (!payload?.descripcion || payload.descripcion.trim().length < 10) {
    errors.descripcion = "La descripcion debe tener al menos 10 caracteres.";
  }

  if (!["activo", "inactivo"].includes(payload?.estado)) {
    errors.estado = "El estado debe ser activo o inactivo.";
  }

  return errors;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const items = listCultivos({
    search: searchParams.get("search") || "",
    tipo: searchParams.get("tipo") || "",
    estado: searchParams.get("estado") || "",
  });

  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(request) {
  const payload = await request.json();
  const errors = validate(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Revisa los campos obligatorios.", errors },
      { status: 400 },
    );
  }

  const item = createCultivo({
    nombre: payload.nombre.trim(),
    tipo: payload.tipo.trim().toLowerCase(),
    descripcion: payload.descripcion.trim(),
    estado: payload.estado,
  });

  return NextResponse.json(
    { message: "Cultivo creado correctamente.", item },
    { status: 201 },
  );
}
