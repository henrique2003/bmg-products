import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { SeeClientModalProps } from "./see-client-modal-types";
import { Eye } from "lucide-react";

export const SeeClientModal: React.FC<SeeClientModalProps> = ({
  handleClickOpenModal,
  client,
  currentClient,
  onOpenChange,
  open,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleClickOpenModal(client)}>
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
          <DialogDescription>Visualize as informações do cliente.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 text-right font-semibold">Nome:</div>
            <div className="col-span-3">{currentClient.name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 text-right font-semibold">Idade:</div>
            <div className="col-span-3">{currentClient.age}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 text-right font-semibold">Email:</div>
            <div className="col-span-3">{currentClient.email}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 text-right font-semibold">Endereço:</div>
            <div className="col-span-3">{currentClient.address}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
