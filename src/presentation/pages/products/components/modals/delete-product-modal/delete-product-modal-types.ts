import { Product } from "@/domain"
import { ModalProps } from "../modal-types"

export type DeleteProductModalProps = ModalProps & {
  handleChangeCurrentProduct(product: Product | null): void
  handleDeleteProduct(): void
  product: Product | null
}
