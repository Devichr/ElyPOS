// src/transaction/index.ts
import { Elysia } from "elysia";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "./service";
import { TransactionSchema, TransactionUpdateSchema } from "./model";

export const transactionRoutes = new Elysia({ prefix: "/transactions" })
  // CREATE Transaction
  .post(
    "/",
    async ({ body }) => {
      return await createTransaction(body);
    },
    { body: TransactionSchema }
  )

  // READ all Transactions
  .get("/", async () => {
    return await getTransactions();
  })

  // READ one Transaction
  .get("/:id", async ({ params }) => {
    return await getTransactionById(params.id);
  })

  .put(
    "/:id",
    async ({ params, body }) => {
      return await updateTransaction(params.id, body);
    },
    { body: TransactionUpdateSchema }
  )

  // DELETE Transaction
  .delete("/:id", async ({ params }) => {
    return await deleteTransaction(params.id);
  });
