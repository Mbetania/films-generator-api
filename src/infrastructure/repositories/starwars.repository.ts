import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from 'src/application';
import { Film } from 'src/domain';
import { StarWarsApiService } from 'src/infrastructure/config';

@Injectable()
export class StarWarsRepository {
  constructor(
    @InjectModel(Entity.Film) private readonly filmModel: Model<Film>,
    private readonly starWarsApiService: StarWarsApiService,
  ) {}

  async populateFilms(): Promise<void> {
    const response = await this.starWarsApiService.getAllFilms();
    const films = response.results;

    for (const film of films) {
      const existingFilm = await this.filmModel.findOne({
        episode_id: film.episode_id,
      });

      if (!existingFilm) {
        const newFilm = new this.filmModel({
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: new Date(film.release_date),
        });

        await newFilm.save();
      }
    }
  }
}
