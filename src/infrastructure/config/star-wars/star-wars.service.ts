import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StarWarsApiService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('STARWARS_BASE_URL');
  }

  async getAllFilms(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.axiosRef
        .get(`${this.baseUrl}/films/`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getFilmById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.axiosRef
        .get(`${this.baseUrl}/films/${id}/`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
