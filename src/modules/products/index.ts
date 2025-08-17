// src/product/index.ts
import { Elysia } from "elysia"
import {
  createProduct, getProducts, getProductById,
  updateProduct, deleteProduct,
  createCategory, getCategories, getCategoryById,
  updateCategory, deleteCategory
} from "./service"
import { ProductSchema, CategorySchema } from "./model"

export const productRoutes = new Elysia({ prefix: "/products" })
  // CREATE Product
  .post("/", async ({ body }) => {
    return await createProduct(body)
  }, { body: ProductSchema })

  // READ all Products
  .get("/", async () => {
    return await getProducts()
  })

  // READ one Product
  .get("/:id", async ({ params }) => {
    return await getProductById(params.id)
  })

  // UPDATE Product
  .put("/:id", async ({ params, body }) => {
    return await updateProduct(params.id, body)
  }, { body: ProductSchema })

  // DELETE Product
  .delete("/:id", async ({ params }) => {
    return await deleteProduct(params.id)
  })


export const categoryRoutes = new Elysia({ prefix: "/categories" })
  // CREATE Category
  .post("/", async ({ body }) => {
    return await createCategory(body)
  }, { body: CategorySchema })

  // READ all Categories
  .get("/", async () => {
    return await getCategories()
  })

  // READ one Category
  .get("/:id", async ({ params }) => {
    return await getCategoryById(params.id)
  })

  // UPDATE Category
  .put("/:id", async ({ params, body }) => {
    return await updateCategory(params.id, body)
  }, { body: CategorySchema })

  // DELETE Category
  .delete("/:id", async ({ params }) => {
    return await deleteCategory(params.id)
  })
