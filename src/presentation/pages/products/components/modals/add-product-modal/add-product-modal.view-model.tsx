'use client'

import { ChangeEvent, useState } from "react"
import { UseAddProductModalParams } from "./add-product-modal-types"
import { Product } from "@/domain"

export function useAddProductModalViewModel({
  onProductCreate
}: UseAddProductModalParams) {
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0
  })
  function handleChangeProductForm(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target) {
      return
    }

    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  async function handleCreateProduct(): Promise<void> {
    // api

    onProductCreate(newProduct)
  }

  return {
    newProduct,
    handleCreateProduct,
    handleChangeProductForm
  }
}
