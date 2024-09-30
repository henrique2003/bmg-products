'use client';

import { ChangeEvent, useState } from "react";
import { UseAddClientModalParams } from "./add-client-modal-types";
import { Client } from "@/domain";
import { BmgService } from '../../../../../../infra-data/services/bmg-service';
import { Notification } from "@/presentation/utils/notifications";
import { Email } from "@/domain/core/value-objects";

const bmgService = new BmgService();

export function useAddClientModalViewModel({
  onClientCreate
}: UseAddClientModalParams) {
  const [newClient, setNewClient] = useState<Client>({
    id: 0,
    name: '',
    age: 0,
    email: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeClientForm(e: ChangeEvent<HTMLInputElement>): void {
    let value: string | number = e.target.value;

    if (value === '' && e.target.type === 'number') {
      return;
    }

    if (e.target.type === 'number' && !isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }

    setNewClient({ ...newClient, [e.target.name]: value });
  }

  async function handleCreateClient(): Promise<void> {
    setIsLoading(true);

    if (!newClient.name || newClient.age <= 0 || !newClient.email || !newClient.address) {
      setIsLoading(false);
      return Notification.error('Preencha todos os campos');
    }

    if (!Email.isValid(newClient.email)) {
      setIsLoading(false);
      return Notification.error('Email inválido');
    }

    const result = await bmgService.create(newClient);
    if (!result.ok) {
      setIsLoading(false);
      return Notification.error('Erro ao criar cliente, confira os dados');
    }

    Notification.success('Cliente criado com sucesso');
    onClientCreate(newClient);
    setNewClient({
      id: 0,
      name: '',
      age: 0,
      email: '',
      address: ''
    });
    setIsLoading(false);
  }

  return {
    newClient,
    handleCreateClient,
    handleChangeClientForm,
    isLoading
  };
}
