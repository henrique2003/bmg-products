'use client';

import { Client } from "@/domain";
import { ChangeEvent, useState } from "react";
import { UseClientTableViewModelParams } from "./client-table-types";
import { BmgService } from '../../../../../infra-data/services/bmg-service';
import { Notification } from "@/presentation/utils/notifications";

const bmgService = new BmgService();

export function useClientTableViewModel({
  onDeleteClient,
  onEditClient
}: UseClientTableViewModelParams) {
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSeeModalOpen, setIsSeeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client>({
    id: 0,
    name: '',
    age: 0,
    email: '',
    address: ''
  });

  function handleChangeCurrentClient(client: Client): void {
    setCurrentClient(client);
  }

  const handleDeleteClient = async (): Promise<void> => {
    setIsLoadingAction(true);

    if (!currentClient) {
      return;
    }

    const result = await bmgService.delete(currentClient.id);
    if (!result.ok) {
      return Notification.error('Erro ao deletar cliente');
    }

    onDeleteClient(currentClient);
    setIsDeleteModalOpen(false);
    setCurrentClient({ id: 0, name: '', age: 0, email: '', address: '' });
    setIsLoadingAction(false);
    Notification.success('Cliente deletado com sucesso');
  };

  const handleClickEditClient = async (): Promise<void> => {
    setIsLoadingAction(true);

    if (!currentClient) {
      return;
    }

    if (!currentClient.name || !currentClient.email || !currentClient.address) {
      return Notification.error('Preencha todos os campos');
    }

    const result = await bmgService.update(currentClient);
    if (!result.ok) {
      return;
    }

    setIsEditModalOpen(false);
    setCurrentClient({ id: 0, name: '', age: 0, email: '', address: '' });
    onEditClient(currentClient);
    setIsLoadingAction(false);
    Notification.success('Cliente atualizado com sucesso');
  };

  function handleClickOpenEditModal(client: Client): void {
    setCurrentClient(client);
  }

  function handleClickOpenSeeModal(client: Client): void {
    setCurrentClient(client);
  }

  function handleChangeClientForm(e: ChangeEvent<HTMLInputElement>): void {
    let value: string | number = e.target.value;

    if (value === '' && e.target.type === 'number') {
      return;
    }

    if (e.target.type === 'number' && !isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }

    setCurrentClient({ ...currentClient, [e.target.name]: value });
  }

  function handleChangeEditModalIsOpen(open: boolean): void {
    setIsEditModalOpen(open);
  }

  function handleChangeSeeModalIsOpen(open: boolean): void {
    setIsSeeModalOpen(open);
  }

  function handleChangeDeleteModalIsOpen(open: boolean): void {
    setIsDeleteModalOpen(open);
  }

  return {
    handleChangeClientForm,
    handleClickOpenEditModal,
    handleClickEditClient,
    handleDeleteClient,
    handleChangeSeeModalIsOpen,
    handleClickOpenSeeModal,
    handleChangeCurrentClient,
    handleChangeEditModalIsOpen,
    handleChangeDeleteModalIsOpen,
    isLoadingAction,
    isDeleteModalOpen,
    isEditModalOpen,
    isSeeModalOpen,
    currentClient
  };
}
