import { NextResponse } from "next/server";

const DEMO_USER = {
  email: "ejemplo@empresa.com",
  password: "Password123*",
  name: "Admin Demo",
};

export async function POST(request) {
  const { email, password } = await request.json();

  await new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });

  if (!email || !password) {
    return NextResponse.json(
      { message: "Debes completar correo y contrasena." },
      { status: 400 },
    );
  }

  if (email !== DEMO_USER.email) {
    return NextResponse.json({ message: "Correo invalido" }, { status: 401 });
  }

  if (password !== DEMO_USER.password) {
    return NextResponse.json({ message: "Contrasena incorrecta" }, { status: 401 });
  }

  return NextResponse.json(
    {
      message: "Login exitoso",
      token: "demo-jwt-token",
      user: {
        email: DEMO_USER.email,
        name: DEMO_USER.name,
      },
    },
    { status: 200 },
  );
}
