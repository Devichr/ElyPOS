import { prisma } from '../../utils/prisma'

// Product services
export async function createProduct(data: {
  name: string
  price: number
  stock: number
  sku?: string
  categoryId?: string
}) {
  return prisma.product.create({ data })
}

export async function getProducts() {
  return prisma.product.findMany({
    include: { category: true }
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true }
  })
}

export async function updateProduct(id: string, data: Partial<{
  name: string
  price: number
  stock: number
  sku?: string
  categoryId?: string
}>) {
  return prisma.product.update({
    where: { id },
    data
  })
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id }
  })
}

// Category services
export async function createCategory(data: { name: string }) {
  return prisma.category.create({ data })
}

export async function getCategories() {
  return prisma.category.findMany({
    include: { products: true }
  })
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: { products: true }
  })
}

export async function updateCategory(id: string, data: { name?: string }) {
  return prisma.category.update({
    where: { id },
    data
  })
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id }
  })
}
