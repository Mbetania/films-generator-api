import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import {
  CreateFilmDTO,
  CreateFilmUseCaseV1,
  DefaultApiResponse,
  DeleteFilmUseCaseV1,
  EUserRole,
  GetFilmUseCaseV1,
  GetListFilmsUseCaseV1,
  ModifyFilmUseCaseV1,
  UpdateFilmDTO,
} from 'src/application';
import { IFilm } from 'src/domain';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/config';
import { Roles } from 'src/infrastructure/decorators';

@Controller({
  version: '1',
  path: 'film',
})
export class FilmControllerV1 {
  constructor(
    private readonly createFilmUseCase: CreateFilmUseCaseV1,
    private readonly deleteOneUseCase: DeleteFilmUseCaseV1,
    private readonly getOneFilmUseCase: GetFilmUseCaseV1,
    private readonly getFilmsUseCase: GetListFilmsUseCaseV1,
    private readonly modifyFilmUseCase: ModifyFilmUseCaseV1,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  async createFilm(
    @Body() body: CreateFilmDTO,
    @Request() req,
  ): Promise<DefaultApiResponse<any>> {
    const user_id = req.user._id;

    const film = await this.createFilmUseCase.execute(body, user_id);
    return {
      message: 'Created Film successfully',
      info: { id: film._id },
      status: HttpStatus.CREATED,
    };
  }

  @Delete('/:film_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  async deleteOne(
    @Request() req,
    @Param('film_id') film_id: string,
  ): Promise<DefaultApiResponse<any>> {
    const user_id = req.user._id;
    await this.deleteOneUseCase.execute(new Types.ObjectId(film_id), user_id);

    return {
      message: 'Film deleted successfully',
      status: HttpStatus.OK,
    };
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN, EUserRole.REGULAR)
  async getFilms(): Promise<DefaultApiResponse<IFilm[]>> {
    const films = await this.getFilmsUseCase.execute();
    return {
      message: 'Films retrieved successfully',
      info: films,
      status: HttpStatus.OK,
    };
  }

  @Get(':id')
  async getFilmById(@Param('id') id: string) {
    const filmId = new Types.ObjectId(id);
    const film = await this.getOneFilmUseCase.execute(filmId);
    return film;
  }

  @Patch('/:film_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  async updateFilm(
    @Request() req,
    @Param('film_id') film_id: string,
    @Body() body: UpdateFilmDTO,
  ): Promise<IFilm> {
    const user_id = req.user._id;
    return await this.modifyFilmUseCase.execute(film_id, body, user_id);
  }
}
