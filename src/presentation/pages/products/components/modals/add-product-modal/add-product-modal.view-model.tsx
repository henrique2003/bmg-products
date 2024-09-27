'use client'

import { ChangeEvent, useState } from "react"
import { UseAddProductModalParams } from "./add-product-modal-types"
import { Product } from "@/domain"
import { BmgService } from '../../../../../../infra-data/services/bmg-service';
import { Notification } from "@/presentation/utils/notifications";

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
    let value: string | number = e.target.value

    if (value === '') {
      return
    }

    if (e.target.type === 'number' && !isNaN(parseFloat(value))) {
      value = parseFloat(value)
    }

    setNewProduct({ ...newProduct, [e.target.name]: value })
  }

  async function handleCreateProduct(): Promise<void> {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      return Notification.error('Preencha todos os campos')
    }

    const result = await bmgService.create(newProduct)
    if (!result.ok) {
      return Notification.error('Erro ao criar produto, confira os dados')
    }

    Notification.success('Produto criado com sucesso')
    onProductCreate(newProduct)
  }

  return {
    newProduct,
    handleCreateProduct,
    handleChangeProductForm
  }
}
