import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { EditClientModalProps } from "./edit-client-modal-types";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Pencil } from "lucide-react";

export const EditClientModal: React.FC<EditClientModalProps> = ({
  handleChangeClientForm,
  handleClickEditClient,
  handleClickOpenModal,
  client,
  currentClient,
  onOpenChange,
  open,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2 max-sm:mr-0 max-sm:mb-1" onClick={() => handleClickOpenModal(client)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>Editar detalhes do cliente.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">Nome</Label>
            <Input
              id="edit-name"
              value={currentClient.name}
              onChange={handleChangeClientForm}
              className="col-span-3"
              name="name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-age" className="text-right">Idade</Label>
            <Input
              id="edit-age"
              type="number"
              value={currentClient.age}
              onChange={handleChangeClientForm}
              className="col-span-3"
              name="age"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-email" className="text-right">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={currentClient.email}
              onChange={handleChangeClientForm}
              className="col-span-3"
              name="email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-address" className="text-right">Endereço</Label>
            <Input
              id="edit-address"
              value={currentClient.address}
              onChange={handleChangeClientForm}
              className="col-span-3"
              name="address"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClickEditClient}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
