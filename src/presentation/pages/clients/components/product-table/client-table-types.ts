import { Client } from "@/domain";

export type ClientTableProps = {
  clients: Client[];
  onDeleteClient(client: Client): void;
  onEditClient(client: Client): void;
};

export type UseClientTableViewModelParams = {
  onDeleteClient(client: Client): void;
  onEditClient(client: Client): void;
};
