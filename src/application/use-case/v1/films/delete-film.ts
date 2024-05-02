import { Inject, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { PORT } from 'src/application/enums';
import { FilmNotFound } from 'src/application/exceptions';
import { FilmRepository } from 'src/infrastructure';

@Injectable()
export class DeleteFilmUseCaseV1 {
  private readonly logger = new Logger(DeleteFilmUseCaseV1.name);

  constructor(
    @Inject(PORT.Film) private readonly filmRepository: FilmRepository,
  ) {}

  async execute(film_id: Types.ObjectId, user_id: string): Promise<void> {
    const film = await this.filmRepository.findOne({ query: { _id: film_id } });

    if (!film) {
      throw new FilmNotFound();
    }

    await this.filmRepository.delete({ query: { _id: film_id } });
  }
}
