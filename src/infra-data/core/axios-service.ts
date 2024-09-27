/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { IApiService, Params } from '@/common/protocols';
import { IResult, Result } from '@/common/patterns';

export class AxiosService implements IApiService {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  });

  async get<Response>(
    url: string,
    params?: Params
  ): Promise<IResult<Response, Error>> {
    try {
      const result = await this.axios.get<Response>(url, {
        params
      });

      return Result.success(result.data);
    } catch (error: unknown) {
      return Result.failure(new Error('Error on list item in api'));
    }
  }

  async post<Request, Response>(
    url: string,
    data: Request,
    params?: { [key: string]: any }
  ): Promise<IResult<Response, Error>> {
    try {
      const result = await this.axios.post<Response>(url, data, {
        params
      });

      return Result.success(result.data);
    } catch (error) {
      return Result.failure(new Error('Error on create item in api'));
    }
  }

  async put<Request, Response>(
    url: string,
    data: Request,
    params?: { [key: string]: any }
  ): Promise<IResult<Response, Error>> {
    try {
      const result = await this.axios.put<Response>(url, data, {
        params
      });

      return Result.success(result.data);
    } catch (error) {
      return Result.failure(new Error('Error on update item in api'));
    }
  }

  async delete(url: string): Promise<IResult<void, Error>> {
    try {
      await this.axios.delete<Response>(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return Result.success();
    } catch (error) {
      return Result.failure(new Error('Error on delete item in api'));
    }
  }
}
