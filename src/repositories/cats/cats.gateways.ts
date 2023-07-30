import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { CreateCatsDto } from 'src/cats/dto/create-cat.dto';
import { Model } from 'mongoose';
import axios from 'axios';

@Injectable()
export class CatsGateways {
  constructor(
    @InjectModel(Cat.name)
    private readonly catModel: Model<Cat>,
  ) {}

  create(createCatDto: CreateCatsDto): Promise<Cat> {
    const catCreated = this.catModel.create(createCatDto);
    return catCreated;
  }

  findAll(query: object): Promise<Cat[]> {
    return this.catModel.find(query);
  }
}
