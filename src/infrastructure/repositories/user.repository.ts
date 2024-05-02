import { IUser, User } from 'src/domain';
import { IRepository, Repository } from './repository';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from 'src/application';
import { Model, Types } from 'mongoose';

export interface IUserRepository extends IRepository<IUser> {}

export class UserRepository extends Repository<User> {
  constructor(
    @InjectModel(Entity.User) private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
