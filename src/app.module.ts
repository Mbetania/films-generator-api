import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import {
  AuthModule,
  BcryptModule,
  FilmModule,
  JWTModule,
  MongoDBModule,
  StarwarsModule,
} from './infrastructure';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('RATE_LIMIT_TTL'),
          limit: config.get('RATE_LIMIT_COUT'),
        },
      ],
    }),
    MongoDBModule,
    BcryptModule,
    JWTModule,
    AuthModule,
    FilmModule,
    StarwarsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
