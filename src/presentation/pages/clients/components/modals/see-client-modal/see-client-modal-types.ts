import { Client } from "@/domain";
import { ModalProps } from "../modal-types";

export type SeeClientModalProps = ModalProps & {
  handleClickOpenModal(client: Client | null): void;
  client: Client | null;
  currentClient: Client;
};
