import { Product } from "@/domain"
import { ModalProps } from "../modal-types"
import { ChangeEvent } from "react"

export type EditProductModalProps = ModalProps & {
  handleChangeProductForm(e: ChangeEvent<HTMLInputElement>): void
  handleClickEditProduct(): void
  handleClickOpenModal(product: Product | null): void
  product: Product | null
  currentProduct: Product
}
