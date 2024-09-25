import { Button } from "@/presentation/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import { EditProductModalProps } from "./edit-product-modal-types"
import { Input } from "@/presentation/components/ui/input"
import { Label } from "@/presentation/components/ui/label"
import { Pencil } from "lucide-react"

export const EditProductModal: React.FC<EditProductModalProps> = ({
  handleChangeProductForm,
  handleClickEditProduct,
  handleClickOpenModal,
  product,
  onOpenChange,
  open
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleClickOpenModal(product)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit the details of the product.</DialogDescription>
        </DialogHeader>
        {product && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input
                id="edit-name"
                value={product.name}
                onChange={handleChangeProductForm}
                className="col-span-3"
                name="name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">Description</Label>
              <Input
                id="edit-description"
                value={product.description}
                onChange={handleChangeProductForm}
                className="col-span-3"
                name="description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">Price</Label>
              <Input
                id="edit-price"
                type="number"
                value={product.price}
                onChange={handleChangeProductForm}
                className="col-span-3"
                name="price"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleClickEditProduct}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
