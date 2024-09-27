import { IResult, Result } from '@/common/patterns';
import { AxiosService } from '../core/axios-service';
import { Client } from '@/domain';

const apiService = new AxiosService();

export class BmgService {
  public async getAll(): Promise<IResult<Client[], Error>> {
    const result = await apiService.get<Client[]>('/clients');
    if (!result.ok) {
      return Result.failure(result.error);
    }

    return Result.success(result.value);
  }

  public async update(request: Client): Promise<IResult<void, Error>> {
    const result = await apiService.put(`/clients/${request.id}`, request);
    if (!result.ok) {
      return Result.failure(result.error);
    }

    return Result.success();
  }

  public async create(request: Client): Promise<IResult<void, Error>> {
    const result = await apiService.post('/clients', request);
    if (!result.ok) {
      return Result.failure(result.error);
    }

    return Result.success();
  }

  public async delete(id: number): Promise<IResult<void, Error>> {
    const result = await apiService.delete(`/clients/${id}`);
    if (!result.ok) {
      return Result.failure(result.error);
    }

    return Result.success();
  }
}
