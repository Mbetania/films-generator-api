import { Controller, Post } from '@nestjs/common';
import { PopulateFilmsUseCase } from 'src/application';

@Controller('populate')
export class StarwarsController {
  constructor(private readonly populateFilmsUseCase: PopulateFilmsUseCase) {}

  @Post('/')
  async populateFilms() {
    await this.populateFilmsUseCase.populateFilms();
  }
}
