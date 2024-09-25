import { Product } from "@/domain"
import { ModalProps } from "../modal-types"

export type AddProductModalProps = ModalProps & {
  onProductCreate: (product: Product) => void
}

export type UseAddProductModalParams = {
  onProductCreate: (product: Product) => void
}

