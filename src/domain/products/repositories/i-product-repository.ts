import { IResult } from "@/common/patterns"
import { Product } from "../entities/product"

export interface IProductRepository {
    obterTodos(): Promise<IResult<Product[]>>
    criar(produto: Product): Promise<IResult<string>>
    editar(produto: Product): Promise<IResult<string>>
}