import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StarwarsController } from '../controllers';
import { PORT, PopulateFilmsUseCase } from 'src/application';
import { FilmRepository, StarWarsRepository } from '../repositories';
import { Film, FilmSchema, User, UserSchema } from 'src/domain';
import { StarWarsApiService } from '../config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Film.name, schema: FilmSchema },
    ]),
    HttpModule,
  ],
  controllers: [StarwarsController],
  providers: [
    StarWarsApiService,
    PopulateFilmsUseCase,
    { provide: PORT.StarwarsApi, useClass: StarWarsApiService },
    { provide: PORT.Film, useClass: FilmRepository },
    { provide: PORT.Starwars, useClass: StarWarsRepository },
  ],
  exports: [StarWarsApiService],
})
export class StarwarsModule {}
