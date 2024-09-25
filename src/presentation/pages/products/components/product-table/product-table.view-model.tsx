'use client'

import { Product } from "@/domain"
import { ChangeEvent, useState } from "react"
import { UseProductTableViewModelParams } from "./product-table-types"

export function useProductTableViewModel({
  onDeleteProduct,
  onEditProduct
}: UseProductTableViewModelParams) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: 0,
    description: '',
    name: '',
    price: 0
  })

  function handleChangeCurrentProduct(product: Product): void {
    setCurrentProduct(product)
  }

  const handleDeleteProduct = (): void => {
    if (!currentProduct) {
      return
    }

    // api

    onDeleteProduct(currentProduct)
    setIsDeleteModalOpen(false)
    setCurrentProduct({
      id: 0,
      description: '',
      name: '',
      price: 0
    })
  }

  const handleClickEditProduct = (): void => {
    if (!currentProduct) {
      return
    }

    // api

    setIsEditModalOpen(false)
    setCurrentProduct({
      id: 0,
      description: '',
      name: '',
      price: 0
    })
    onEditProduct(currentProduct)
  }

  function handleClickOpenEditModal(product: Product): void {
    setCurrentProduct(product)
  }

  function handleChangeProductForm(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target) {
      return
    }

    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value })
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
