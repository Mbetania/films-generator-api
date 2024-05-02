import { Inject, Injectable, Logger } from '@nestjs/common';
import { PORT } from 'src/application/enums';
import { FilmRepository, StarWarsApiService } from 'src/infrastructure';

@Injectable()
export class PopulateFilmsUseCase {
  private readonly logger = new Logger(PopulateFilmsUseCase.name);

  constructor(
    @Inject(PORT.Film) private readonly filmRepository: FilmRepository,
    @Inject(PORT.StarwarsApi)
    private readonly starWarsApiService: StarWarsApiService,
  ) {}

  async populateFilms(): Promise<void> {
    const response = await this.starWarsApiService.getAllFilms();
    const films = response.results;

    for (const film of films) {
      const existingFilm = await this.filmRepository.findOne({
        query: { episode_id: film.episode_id },
      });

      if (!existingFilm) {
        const newFilm = await this.filmRepository.createFilm({
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
        });
      } else {
      }
    }
  }
}
