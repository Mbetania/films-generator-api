import { Types } from 'mongoose';

export interface IMongoDBEntity {
  _id?: string | Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
