// src/transaction/model.ts
import { t } from "elysia"

// Item transaksi (detail produk)
export const TransactionItemSchema = t.Object({
  productId: t.String(),
  qty: t.Number({ minimum: 1 }),
  price: t.Number()
})

// Transaksi utama
export const TransactionSchema = t.Object({
  userId: t.String(),
  payment: t.String(), // CASH, QRIS, CARD
  status: t.Optional(t.String()),
  items: t.Array(TransactionItemSchema)
})

export const TransactionUpdateSchema = t.Object({
  status: t.Optional(t.String()),
  payment: t.Optional(t.String())
})

export type TransactionUpdateInput = typeof TransactionUpdateSchema.static
export type TransactionInput = typeof TransactionSchema.static
export type TransactionItemInput = typeof TransactionItemSchema.static
