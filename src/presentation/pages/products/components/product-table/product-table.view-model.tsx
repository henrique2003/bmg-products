'use client'

import { Product } from "@/domain"
import { ChangeEvent, useState } from "react"
import { UseProductTableViewModelParams } from "./product-table-types"
import { BmgService } from '../../../../../infra-data/services/bmg-service';
import { Notification } from "@/presentation/utils/notifications";

const bmgService = new BmgService()

export function useProductTableViewModel({
  onDeleteProduct,
  onEditProduct
}: UseProductTableViewModelParams) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: 0,
    description: '',
    title: '',
    price: 0
  })

  function handleChangeCurrentProduct(product: Product): void {
    setCurrentProduct(product)
  }

  const handleDeleteProduct = async (): Promise<void> => {
    if (!currentProduct) {
      return
    }

    const result = await bmgService.delete(currentProduct.id)
    if (!result.ok) {
      return Notification.error('Erro ao deletar produto')
    }

    onDeleteProduct(currentProduct)
    setIsDeleteModalOpen(false)
    setCurrentProduct({
      id: 0,
      description: '',
      title: '',
      price: 0
    })
    Notification.success('Produto deletado com sucesso')
  }

  const handleClickEditProduct = async (): Promise<void> => {
    if (!currentProduct) {
      return
    }

    if (!currentProduct.title || !currentProduct.description || !currentProduct.price) {
      return Notification.error('Preencha todos os campos')
    }

    const result = await bmgService.update(currentProduct)
    if (!result.ok) {
      return
    }

    setIsEditModalOpen(false)
    setCurrentProduct({
      id: 0,
      description: '',
      title: '',
      price: 0
    })
    onEditProduct(currentProduct)
    Notification.success('Produto atualizado com sucesso')
  }

  function handleClickOpenEditModal(product: Product): void {
    setCurrentProduct(product)
  }

  function handleChangeProductForm(e: ChangeEvent<HTMLInputElement>): void {
    let value: string | number = e.target.value

    if (value === '') {
      return
    }

    if (e.target.type === 'number' && !isNaN(parseFloat(value))) {
      value = parseFloat(value)
    }

    setCurrentProduct({ ...currentProduct, [e.target.name]: value })
  }

  function handleChangeEditModalIsOpen(open: boolean): void {
    setIsEditModalOpen(open)
  }

  function handleChangeDeleteModalIsOpen(open: boolean): void {
    setIsDeleteModalOpen(open)
  }

  return {
    handleChangeProductForm,
    handleClickOpenEditModal,
    handleClickEditProduct,
    handleDeleteProduct,
    handleChangeCurrentProduct,
    handleChangeEditModalIsOpen,
    handleChangeDeleteModalIsOpen,
    isDeleteModalOpen,
    isEditModalOpen,
    currentProduct
  }
}
