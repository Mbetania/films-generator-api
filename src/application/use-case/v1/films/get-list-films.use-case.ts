import { Inject, Injectable } from '@nestjs/common';
import { PORT } from 'src/application/enums';
import { IFilm } from 'src/domain';
import { FilmRepository, FilterQuery } from 'src/infrastructure';

@Injectable()
export class GetListFilmsUseCaseV1 {
  constructor(
    @Inject(PORT.Film) private readonly filmRepository: FilmRepository,
  ) {}

  async execute(): Promise<IFilm[]> {
    const filterQuery: FilterQuery<IFilm> = {
      query: {},
    };
    const films = await this.filmRepository.findAll(filterQuery);
    return films;
  }
}
