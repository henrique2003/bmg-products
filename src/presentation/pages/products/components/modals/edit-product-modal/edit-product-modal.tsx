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
  currentProduct,
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
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>Editar detalhes do produto.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">Name</Label>
            <Input
              id="edit-name"
              value={currentProduct.title}
              onChange={handleChangeProductForm}
              className="col-span-3"
              name="title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-description" className="text-right">Description</Label>
            <Input
              id="edit-description"
              value={currentProduct.description}
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
              value={currentProduct.price}
              onChange={handleChangeProductForm}
              className="col-span-3"
              name="price"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClickEditProduct}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
