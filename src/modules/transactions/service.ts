import { prisma } from '../../utils/prisma'

// CREATE transaction
export async function createTransaction(data: {
  userId: string
  payment: string
  status?: string
  items: { productId: string; qty: number; price: number }[]
}) {
  // Hitung total dari subtotal item
  const itemsWithSubtotal = data.items.map(item => ({
    ...item,
    subtotal: item.qty * item.price
  }))

  const total = itemsWithSubtotal.reduce((acc, item) => acc + item.subtotal, 0)

  return prisma.transaction.create({
    data: {
      userId: data.userId,
      payment: data.payment,
      status: data.status || "PENDING",
      total,
      items: {
        create: itemsWithSubtotal
      }
    },
    include: {
      items: true,
      user: true
    }
  })
}

// GET all transactions
export async function getTransactions() {
  return prisma.transaction.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" }
  })
}

// GET one transaction
export async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, user: true }
  })
}

// UPDATE status/payment
export async function updateTransaction(id: string, data: { status?: string; payment?: string }) {
  return prisma.transaction.update({
    where: { id },
    data
  })
}

// DELETE transaction
export async function deleteTransaction(id: string) {
  return prisma.transaction.delete({
    where: { id }
  })
}
