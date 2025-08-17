// src/product/model.ts
import { t } from "elysia"

// DTO / Schema Validation
export const ProductSchema = t.Object({
  name: t.String({ minLength: 1 }),
  price: t.Number(),
  stock: t.Number({ minimum: 0 }),
  sku: t.Optional(t.String()),
  categoryId: t.Optional(t.String())
})

export const CategorySchema = t.Object({
  name: t.String({ minLength: 1 })
})

export type ProductInput = typeof ProductSchema.static
export type CategoryInput = typeof CategorySchema.static
