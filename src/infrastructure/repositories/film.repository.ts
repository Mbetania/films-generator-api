import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Film, IFilm } from 'src/domain';
import { IRepository, Repository } from './repository';
import { CreateFilmDTO, Entity } from 'src/application';
import { StarWarsApiService } from '../config';
import { NotFoundException } from '@nestjs/common';

export interface IFilmRepository extends IRepository<IFilm> {
  createFilm(createFilmDto: CreateFilmDTO): Promise<Film>;
  findFilmById(id: string): Promise<Film>;
  updateFilm(id: Types.ObjectId, dataFilm: Partial<IFilm>): Promise<Film>;
}

export class FilmRepository extends Repository<Film> {
  constructor(
    @InjectModel(Entity.Film) private readonly filmModel: Model<Film>,
    private readonly starwarService: StarWarsApiService,
  ) {
    super(filmModel);
  }

  async createFilm(body: CreateFilmDTO): Promise<Film> {
    const createdFilm = new this.filmModel(body);
    return createdFilm.save();
  }
  async findFilmById(id: string): Promise<Film> {
    const film = await this.filmModel.findById(id).exec();
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found.`);
    }
    return film;
  }

  async updateFilm(id: Types.ObjectId, dataFilm: IFilm): Promise<Film> {
    return await this.filmModel.findByIdAndUpdate(id, dataFilm, { new: true });
  }
}
