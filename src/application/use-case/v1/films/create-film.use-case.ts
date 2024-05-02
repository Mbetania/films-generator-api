import { Inject, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateFilmDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { IFilm } from 'src/domain';
import { FilmRepository } from 'src/infrastructure';

@Injectable()
export class CreateFilmUseCaseV1 {
  private readonly logger = new Logger(CreateFilmUseCaseV1.name);

  constructor(
    @Inject(PORT.Film) private readonly filmRepository: FilmRepository,
  ) {}

  async execute(body: CreateFilmDTO, admin: string): Promise<IFilm> {
    const user_id = new Types.ObjectId(admin);
    const dataFilm: IFilm = {
      title: body.title,
      director: body.director,
      episode_id: body.episode_id,
      opening_crawl: body.opening_crawl,
      generated_by: user_id,
      producer: body.producer,
    };
    const result = await this.filmRepository.createFilm(dataFilm);
    return result;
  }
}
