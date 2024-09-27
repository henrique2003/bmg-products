import { IResult } from "@/common/patterns";
import { Client } from "../entities/client";

export interface IClientRepository {
    obterTodosClientes(): Promise<IResult<Client[]>>;
    criar(cliente: Client): Promise<IResult<string>>;
    editar(cliente: Client): Promise<IResult<string>>;
}
