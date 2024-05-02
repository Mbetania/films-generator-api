import { IMongoDBEntity } from '../entity.base';
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IFilm extends IMongoDBEntity {
  title: string;
  director: string;
  generated_by?: Types.ObjectId;
  episode_id: number;
  opening_crawl: string;
  planets?: string[];
  species?: string[];
  starships?: string[];
  vehicles?: string[];
  producer?: string;
}

@Schema({ versionKey: false, timestamps: true })
export class Film extends Document implements IFilm {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  director: string;

  @Prop({ type: Types.ObjectId })
  generated_by?: Types.ObjectId;

  @Prop({ type: Number, required: true })
  episode_id: number;

  @Prop({ type: [String], required: true })
  opening_crawl: string;

  @Prop({ type: [String] })
  planets?: string[];

  @Prop({ type: [String] })
  species?: string[];

  @Prop({ type: [String] })
  starships?: string[];

  @Prop({ type: [String] })
  vehicles?: string[];

  @Prop({ type: String, required: true })
  producer?: string;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
