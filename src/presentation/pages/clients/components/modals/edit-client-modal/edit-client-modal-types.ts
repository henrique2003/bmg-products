import { Client } from "@/domain";
import { ModalProps } from "../modal-types";
import { ChangeEvent } from "react";

export type EditClientModalProps = ModalProps & {
  handleChangeClientForm(e: ChangeEvent<HTMLInputElement>): void;
  handleClickEditClient(): void;
  handleClickOpenModal(client: Client | null): void;
  client: Client | null;
  currentClient: Client;
  isLoading: boolean
};
