import { NextResponse } from "next/server";

const AUTH_MICROSERVICE = "ms-auth";

const USERS = [
  {
    email: "admin@agrocontrol.com",
    password: "Admin2026*",
    name: "Administrador General",
    role: "administrador",
    redirectTo: "/administrador",
  },
];

export async function POST(request) {
  const { email, password } = await request.json();

  await new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Debes completar correo y contrasena.",
        service: AUTH_MICROSERVICE,
      },
      { status: 400 },
    );
  }

  const user = USERS.find((item) => item.email === email);

  if (!user) {
    return NextResponse.json({ message: "Correo invalido" }, { status: 401 });
  }

  if (password !== user.password) {
    return NextResponse.json({ message: "Contrasena incorrecta" }, { status: 401 });
  }

  return NextResponse.json(
    {
      message: "Login exitoso",
      token: `demo-jwt-token-${user.role}`,
      service: AUTH_MICROSERVICE,
      redirectTo: user.redirectTo,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
    { status: 200 },
  );
}
