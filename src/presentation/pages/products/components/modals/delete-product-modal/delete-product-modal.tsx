import { Button } from "@/presentation/components/ui/button"
import { DeleteProductModalProps } from "./delete-product-modal-types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import { Trash2 } from "lucide-react"

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  onOpenChange,
  open,
  handleChangeCurrentProduct,
  product,
  handleDeleteProduct
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => handleChangeCurrentProduct(product)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>Are you sure you want to delete this product?</DialogDescription>
        </DialogHeader>
        {product && (
          <div className="py-4">
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          </div>
        )}
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeleteProduct}>Delete Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
