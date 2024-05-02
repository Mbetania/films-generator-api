import { ValidationPipe } from '@nestjs/common';

export const AppValidationPipe: ValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  validationError: {
    target: false,
  },
});
