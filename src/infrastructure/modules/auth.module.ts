import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthControllerV1 } from '../controllers';
import { PORT, SignInV1, SignUpV1 } from 'src/application';
import { UserRepository } from '../repositories';
import { BcryptService, JwtStrategy, LocalStrategy } from '../config';
import { User, UserSchema } from 'src/domain';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [AuthControllerV1],
  providers: [
    SignUpV1,
    SignInV1,
    BcryptService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    { provide: PORT.User, useClass: UserRepository },
  ],
  exports: [],
})
export class AuthModule {}
