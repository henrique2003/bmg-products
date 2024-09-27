'use client'

import { Product } from "@/domain"
import { ChangeEvent, useState } from "react"
import { UseProductTableViewModelParams } from "./product-table-types"
import { BmgService } from '../../../../../infra-data/services/bmg-service';

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
      return
    }

    onDeleteProduct(currentProduct)
    setIsDeleteModalOpen(false)
    setCurrentProduct({
      id: 0,
      description: '',
      title: '',
      price: 0
    })
  }

  const handleClickEditProduct = async (): Promise<void> => {
    if (!currentProduct) {
      return
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
