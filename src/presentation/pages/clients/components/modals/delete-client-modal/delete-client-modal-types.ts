import { Client } from "@/domain";
import { ModalProps } from "../modal-types";

export type DeleteClientModalProps = ModalProps & {
  handleChangeCurrentClient(client: Client | null): void;
  handleDeleteClient(): void;
  client: Client | null;
  isLoading: boolean
};
