'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import { Plus } from 'lucide-react'
import { Input } from "@/presentation/components/ui/input"
import { Button } from "@/presentation/components/ui/button"
import { Label } from "@/presentation/components/ui/label"
import { AddProductModalProps } from "./add-product-modal-types"
import { useAddProductModalViewModel } from "./add-product-modal.view-model"

export const AddProductModal: React.FC<AddProductModalProps> = ({
  onOpenChange,
  open,
  onProductCreate
}) => {
  const {
    handleChangeProductForm,
    handleCreateProduct,
    newProduct
  } = useAddProductModalViewModel({
    onProductCreate
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Enter the details of the new product.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="title"
              value={newProduct.title}
              name='title'
              onChange={handleChangeProductForm}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              value={newProduct.description}
              name='description'
              onChange={handleChangeProductForm}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price}
              name='price'
              onChange={handleChangeProductForm}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateProduct}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
