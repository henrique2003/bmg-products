import { Product } from "@/domain"

export type ProductTableProps = {
  products: Product[]
  onDeleteProduct(product: Product): void
  onEditProduct(product: Product): void
}

export type UseProductTableViewModelParams = {
  onDeleteProduct(product: Product): void
  onEditProduct(product: Product): void
}
