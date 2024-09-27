'use client'

import { ChangeEvent, useState } from "react"
import { UseAddProductModalParams } from "./add-product-modal-types"
import { Product } from "@/domain"
import { BmgService } from '../../../../../../infra-data/services/bmg-service';

const bmgService = new BmgService()

export function useAddProductModalViewModel({
  onProductCreate
}: UseAddProductModalParams) {
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: '',
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
    const result = await bmgService.create(newProduct)
    if (!result.ok) {
      return
    }

    onProductCreate(newProduct)
  }

  return {
    newProduct,
    handleCreateProduct,
    handleChangeProductForm
  }
}
