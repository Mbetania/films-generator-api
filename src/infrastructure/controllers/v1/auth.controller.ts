import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  DefaultApiResponse,
  EUserRole,
  SignInPresentation,
  SignInV1,
  SignUpPresentation,
  SignUpV1,
  SignupDTO,
} from 'src/application';
import { JwtAuthGuard, LocalAuthGuard } from 'src/infrastructure/config';
import { Roles } from 'src/infrastructure/decorators';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthControllerV1 {
  constructor(
    private readonly signupUseCase: SignUpV1,
    private readonly signInUseCase: SignInV1,
  ) {}

  @Post('sign-up')
  async signup(
    @Body() body: SignupDTO,
  ): Promise<DefaultApiResponse<SignUpPresentation>> {
    const info: SignUpPresentation = await this.signupUseCase.exec(body);
    return { message: 'Signup successful', info, status: HttpStatus.CREATED };
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @Roles(EUserRole.REGULAR, EUserRole.ADMIN)
  async signIn(
    @Request() req,
  ): Promise<DefaultApiResponse<SignInPresentation>> {
    const { token, status, role } = await this.signInUseCase.exec(req.user);
    const info: SignInPresentation = { token, status, role };
    return { message: 'User logged', info, status: HttpStatus.OK };
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async check(): Promise<DefaultApiResponse<any>> {
    return { message: 'User logged', status: HttpStatus.OK };
  }

  @Delete('sign-out')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Ok request',
    type: DefaultApiResponse,
  })
  async signout(@Request() req): Promise<DefaultApiResponse<any>> {
    return { message: 'User signout successfully', status: HttpStatus.OK };
  }
}
