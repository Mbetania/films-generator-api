import { HttpStatus } from '@nestjs/common';
import { GenericHttpException } from './generic-http.excepction';

export class FilmNotFound extends GenericHttpException {
  constructor() {
    super('Movie not found', HttpStatus.NOT_FOUND, 'FILM_NOT_FOUND');
  }
}
