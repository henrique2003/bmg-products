import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import { ClientTableProps } from "./client-table-types";
import { EditClientModal, DeleteClientModal, SeeClientModal } from "../modals";
import { useClientTableViewModel } from "./client-table.view-model";

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onDeleteClient,
  onEditClient
}) => {
  const {
    handleChangeCurrentClient,
    handleChangeClientForm,
    handleClickEditClient,
    handleClickOpenEditModal,
    handleClickOpenSeeModal,
    handleDeleteClient,
    handleChangeDeleteModalIsOpen,
    handleChangeEditModalIsOpen,
    handleChangeSeeModalIsOpen,
    isDeleteModalOpen,
    isEditModalOpen,
    currentClient,
    isSeeModalOpen
  } = useClientTableViewModel({
    onDeleteClient,
    onEditClient
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Idade</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.id}</TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.age}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell className="text-right">
              <SeeClientModal
                currentClient={currentClient}
                open={isSeeModalOpen}
                onOpenChange={handleChangeSeeModalIsOpen}
                client={client}
                handleClickOpenModal={handleClickOpenSeeModal}
              />
              <EditClientModal
                currentClient={currentClient}
                open={isEditModalOpen}
                onOpenChange={handleChangeEditModalIsOpen}
                client={client}
                handleChangeClientForm={handleChangeClientForm}
                handleClickEditClient={handleClickEditClient}
                handleClickOpenModal={handleClickOpenEditModal}
              />
              <DeleteClientModal
                client={client}
                handleChangeCurrentClient={handleChangeCurrentClient}
                handleDeleteClient={handleDeleteClient}
                open={isDeleteModalOpen}
                onOpenChange={handleChangeDeleteModalIsOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
