import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUser } from 'src/domain/entities';
import { InvalidCredentials } from 'src/application/exceptions';
import { IUserRepository } from 'src/infrastructure';
import { BcryptService } from 'src/infrastructure/config/bcrypt/bcrypt.service';
import { EUserStatus, PORT } from 'src/application/enums';
import { SignInDTO, TokenPayloadDTO } from 'src/application/dtos';

@Injectable()
export class SignInV1 {
  private readonly logger = new Logger(SignInV1.name);

  constructor(
    @Inject(PORT.User) private readonly userRepository: IUserRepository,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async exec(user: IUser): Promise<any> {
    const updatedUser = await this.userRepository.update(user._id.toString(), {
      status: EUserStatus.ACTIVE,
    });

    const payload: TokenPayloadDTO = {
      _id: user._id.toString(),
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
      status: updatedUser.status,
      role: updatedUser.role,
    };
  }

  async validateUser(data: SignInDTO): Promise<any> {
    const { email, password } = data;
    const user: IUser = await this.userRepository.findOne({
      query: { email: email.toLowerCase() },
    });

    if (!user) throw new InvalidCredentials();

    const matchPassword = await this.bcryptService.comparePasswords(
      password,
      user.password,
    );

    if (!matchPassword) throw new InvalidCredentials();
    return user;
  }
}
