import { NextResponse } from "next/server";
import { getCultivoById, softDeleteCultivo, updateCultivo } from "../data";

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

export async function GET(_request, { params }) {
  const { id } = await params;
  const item = getCultivoById(id);

  if (!item) {
    return NextResponse.json({ message: "Cultivo no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ item }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const payload = await request.json();
  const errors = validate(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Revisa los campos obligatorios.", errors },
      { status: 400 },
    );
  }

  const item = updateCultivo(id, {
    nombre: payload.nombre.trim(),
    tipo: payload.tipo.trim().toLowerCase(),
    descripcion: payload.descripcion.trim(),
    estado: payload.estado,
  });

  if (!item) {
    return NextResponse.json({ message: "Cultivo no encontrado." }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Cultivo actualizado correctamente.", item },
    { status: 200 },
  );
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const item = softDeleteCultivo(id);

  if (!item) {
    return NextResponse.json({ message: "Cultivo no encontrado." }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Cultivo marcado como inactivo.", item },
    { status: 200 },
  );
}
