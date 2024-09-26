import { IResult, Result } from '@/common/patterns';
import { AxiosService } from '../core/axios-service';
import { Product } from '@/domain';

const apiService = new AxiosService()

export class BmgService {
  public async getAll(): Promise<IResult<Product[], Error>> {
    const result = await apiService.get<Product[]>('/products')
    if (!result.ok) {
      return Result.failure(result.error)
    }

    return Result.success(result.value)
  }

  public async update(request: Product): Promise<IResult<void, Error>> {
    const result = await apiService.put(`/products/${request.id}`, request)
    if (!result.ok) {
      return Result.failure(result.error)
    }

    return Result.success()
  }

  public async create(request: Product): Promise<IResult<void, Error>> {
    const result = await apiService.post('/products', request)
    if (!result.ok) {
      return Result.failure(result.error)
    }

    return Result.success()
  }

  public async delete(id: number): Promise<IResult<void, Error>> {
    const result = await apiService.delete(`/products/${id}`)
    if (!result.ok) {
      return Result.failure(result.error)
    }

    return Result.success()
  }
}
