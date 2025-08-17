import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { createUser, verifyUser, getUserById } from "./service";
import type { JwtPayload } from "./model";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET || "el1s14my15tr1gw3hy4n6p4l1n6c4nt1ks3dun14",
      exp: "1d",
    })
  )
  // Register
  .post(
    "/register",
    async ({ body }) => {
      const { username, email, password } = body;
      const user = await createUser(username, email, password);
      return user;
    },
    {
      body: t.Object({
        username: t.String({ minLength: 3 }),
        password: t.String({ minLength: 6 }),
        email: t.String({ format: "email" }),
      }),
    }
  )
  // Login
  .post(
    "/login",
    async ({ body, jwt }) => {
      const { email, password } = body;
      const user = await verifyUser(email, password);
      if (!user)
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401,
        });
      const token = await jwt.sign({
        id: user.id,
        email: user.email,
      } as JwtPayload);
      return { token };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  // Me (butuh Authorization: Bearer <token>)
  .get("/me", async ({ jwt, headers }) => {
    const token =
      headers["authorization"] || headers["Authorization"]?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });

    const payload = await jwt.verify(token);
    if (!payload)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });

    const user = await getUserById((payload as JwtPayload).id);
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    return user;
  });
