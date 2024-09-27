import { Button } from "@/presentation/components/ui/button";
import { DeleteClientModalProps } from "./delete-client-modal-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { Trash2 } from "lucide-react";

export const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  onOpenChange,
  open,
  handleChangeCurrentClient,
  client,
  handleDeleteClient,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => handleChangeCurrentClient(client)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Cliente</DialogTitle>
          <DialogDescription>Você tem certeza que deseja deletar este cliente?</DialogDescription>
        </DialogHeader>
        {client && (
          <div className="py-4">
            <p><strong>Nome:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Idade:</strong> {client.age}</p>
          </div>
        )}
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeleteClient}>Deletar Cliente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
