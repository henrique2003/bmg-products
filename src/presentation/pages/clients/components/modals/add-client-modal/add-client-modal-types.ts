import { Client } from "@/domain";
import { ModalProps } from "../modal-types";

export type AddClientModalProps = ModalProps & {
  onClientCreate: (client: Client) => void;
};

export type UseAddClientModalParams = {
  onClientCreate: (client: Client) => void;
};
