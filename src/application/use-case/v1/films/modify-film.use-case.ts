import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateFilmDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { IFilm } from 'src/domain';
import { IFilmRepository } from 'src/infrastructure';

@Injectable()
export class ModifyFilmUseCaseV1 {
  private readonly logger = new Logger(ModifyFilmUseCaseV1.name);

  constructor(
    @Inject(PORT.Film) private readonly filmRepository: IFilmRepository,
  ) {}

  async execute(
    film_id: string,
    body: UpdateFilmDTO,
    admin: string,
  ): Promise<IFilm> {
    const user_id = new Types.ObjectId(admin);
    const filmToUpdate = await this.filmRepository.findFilmById(film_id);
    if (!filmToUpdate) {
      throw new NotFoundException(`Film with id ${film_id} not found.`);
    }

    const partialDataFilm: Partial<IFilm> = {
      title: body.title,
      director: body.director,
      episode_id: body.episode_id,
      opening_crawl: body.opening_crawl,
      generated_by: user_id,
      producer: body.producer,
    };

    const result = await this.filmRepository.updateFilm(
      new Types.ObjectId(film_id),
      partialDataFilm,
    );
    return result;
  }
}
