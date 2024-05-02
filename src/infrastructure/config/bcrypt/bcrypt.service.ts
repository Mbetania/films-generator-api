import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptService {
  private HASH_ROUNDS: number;

  constructor(private configService: ConfigService) {
    this.HASH_ROUNDS = parseInt(configService.get('HASH_ROUNDS'));
  }

  async encriptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.HASH_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  passwordGenerator(len: number): string {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const password = [];

    for (let i = 0; i <= len; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password.push(chars.substring(randomNumber, randomNumber + 1));

      return password.join();
    }
  }
}
