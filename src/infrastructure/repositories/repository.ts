import {
  Model,
  UpdateQuery,
  FilterQuery as MongooseFilterQuery,
  Types,
  ModifyResult,
} from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { ICreateDocument } from 'src/application';

export interface IRepository<T> {
  create: (data: ICreateDocument<T> | T) => Promise<T>;
  findAll: (filter?: FilterQuery<T>) => Promise<T[]>;
  findOne: (filters: FilterQuery<T>) => Promise<T>;
  update: (_id: string, data: UpdateQuery<T>) => Promise<any>;
  updateAll: (filter: FilterQuery<T>, data: UpdateQuery<T>) => Promise<any>;
  delete: (filter: FilterQuery<T>) => Promise<any>;
}

@Injectable()
export abstract class Repository<T> implements IRepository<T> {
  protected readonly logger: Logger;

  constructor(private readonly model: Model<T>) {
    this.logger = new Logger(model.name);
  }

  async create(data: ICreateDocument<T> | T): Promise<T> {
    const documentData =
      data instanceof Object && 'value' in data ? data.value : data;
    return await this.model.create(documentData);
  }

  async findAll(filter?: FilterQuery<T>): Promise<T[]> {
    const query = this.model.find(filter.query);

    if (Boolean(filter.populate)) query.populate(filter.populate);

    if (Boolean(filter.skip) && Boolean(filter.limit)) {
      const skip = Boolean(filter.skip)
        ? (filter.skip - 1) * filter.limit
        : undefined;
      query.skip(skip);
      query.limit(filter.limit);
    }

    return await query.exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    const query = this.model.findOne(filter.query);

    if (Boolean(filter.populate)) query.populate(filter.populate);

    return await query.exec();
  }

  async update(_id: string, profileData: Partial<T>): Promise<ModifyResult<T>> {
    return await this.model.findByIdAndUpdate(_id, profileData, { new: true });
  }

  async updateAll(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<any> {
    return this.model.updateMany(filter.query, data);
  }

  async delete(filter: FilterQuery<T>): Promise<any> {
    return await this.model.deleteOne(filter.query);
  }

  async count(filter?: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(filter.query);
  }
}

export class FilterQuery<T> {
  query: MongooseFilterQuery<T>;
  populate?: string | string[];
  skip?: number;
  limit?: number;
  _id?: Types.ObjectId | string;
}
