import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PORT } from 'src/application/enums';
import { Film } from 'src/domain';
import { FilmRepository, FilterQuery } from 'src/infrastructure';

@Injectable()
export class GetFilmUseCaseV1 {
  constructor(
    @Inject(PORT.Film) private readonly filmRepository: FilmRepository,
  ) {}

  async execute(filmId: Types.ObjectId): Promise<Film> {
    const filter: FilterQuery<Film> = {
      query: { _id: filmId },
    };
    const film = await this.filmRepository.findOne(filter);
    return film;
  }
}
