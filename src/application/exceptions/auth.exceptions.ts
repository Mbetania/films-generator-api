import { HttpStatus } from '@nestjs/common';
import { GenericHttpException } from './generic-http.excepction';

export class UserAlreadyExists extends GenericHttpException {
  constructor() {
    super(
      'Another user is already registered with the same email address.',
      HttpStatus.UNAUTHORIZED,
      'USER_ALREADY_EXISTS',
    );
  }
}

export class InvalidCredentials extends GenericHttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.BAD_REQUEST, 'INVALID_CREDENTIALS');
  }
}

export class InvalidToken extends GenericHttpException {
  constructor() {
    super('Invalid token', HttpStatus.UNAUTHORIZED, 'INVALID_TOKEN');
  }
}

export class UserNotRegistered extends GenericHttpException {
  constructor() {
    super('User is not registered', HttpStatus.UNAUTHORIZED, 'INVALID_TOKEN');
  }
}
