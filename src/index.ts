// index.ts
import { Elysia } from "elysia";
import { auth } from "./modules/auth/index"; // pastikan path sesuai struktur projectmu
import { productRoutes, categoryRoutes } from "./modules/products/index"; // pastikan path sesuai struktur projectmu
import { transactionRoutes } from "./modules/transactions/index"; // pastikan path sesuai struktur projectmu
import { swagger } from "@elysiajs/swagger";

const app = new Elysia().use(swagger({
  documentation:{
    info: {
      title: "ElyPOS API",
      description: "API untuk sistem kasir ElyPOS",
      version: "1.0.0"
    },
    servers: [{
      url: "http://localhost:3000",
      description: "Development Server"
    }]
  },
  path: "/docs", // path untuk dokumentasi Swagger
}))
  .use(auth)
  .use(productRoutes) // daftar semua route dari product.ts
  .use(categoryRoutes) // daftar semua route dari category.ts
  .use(transactionRoutes) // daftar semua route dari transaction.ts
  .get("/", () => "Hello Elysia") // test route utama
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
