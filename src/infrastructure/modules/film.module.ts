import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateFilmUseCaseV1,
  DeleteFilmUseCaseV1,
  GetFilmUseCaseV1,
  GetListFilmsUseCaseV1,
  ModifyFilmUseCaseV1,
  PORT,
} from 'src/application';
import { Film, FilmSchema, User, UserSchema } from 'src/domain';
import { FilmRepository } from '../repositories';
import { FilmControllerV1 } from '../controllers';
import { StarwarsModule } from './star-wars-api.module';
import { StarWarsApiService } from '../config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Film.name, schema: FilmSchema },
    ]),
    StarwarsModule,
    HttpModule,
  ],
  controllers: [FilmControllerV1],
  providers: [
    CreateFilmUseCaseV1,
    DeleteFilmUseCaseV1,
    GetFilmUseCaseV1,
    GetListFilmsUseCaseV1,
    ModifyFilmUseCaseV1,
    StarWarsApiService,
    { provide: PORT.Film, useClass: FilmRepository },
  ],
})
export class FilmModule {}
