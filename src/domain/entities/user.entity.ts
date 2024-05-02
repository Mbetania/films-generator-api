import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { IMongoDBEntity } from './entity.base';
import { EUserRole, EUserStatus } from 'src/application';

export interface IUser extends IMongoDBEntity {
  email?: string;
  password?: string;
  status: EUserStatus;
  role?: EUserRole;
}

@Schema({ versionKey: false, timestamps: true })
export class User extends Document implements IUser {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email?: string;

  @Prop({
    type: String,
    required: true,
  })
  @Exclude()
  password?: string;

  @Prop({
    type: String,
    enum: EUserStatus,
    default: EUserStatus.PENDING,
  })
  status: EUserStatus;

  @Prop({ type: String, enum: Object.values(EUserRole), required: true })
  role: EUserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
