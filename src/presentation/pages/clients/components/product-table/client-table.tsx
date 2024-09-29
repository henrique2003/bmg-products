import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import { ClientTableProps } from "./client-table-types";
import { EditClientModal, DeleteClientModal, SeeClientModal } from "../modals";
import { useClientTableViewModel } from "./client-table.view-model";

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onDeleteClient,
  onEditClient,
  isLoading
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
    isSeeModalOpen,
    isLoadingAction
  } = useClientTableViewModel({
    onDeleteClient,
    onEditClient
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] max-sm:hidden">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium max-sm:hidden">{client.id}</TableCell>
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
                  isLoading={isLoadingAction}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && (
        <p className="text-center text-gray-500 my-4">Procurando clientes...</p>
      )}
      {!isLoading && clients.length === 0 && (
        <p className="text-center text-gray-500 my-4">Nenhum cliente encontrado</p>
      )}
    </div>
  );
};
