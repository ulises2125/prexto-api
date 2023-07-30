import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatsDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from 'src/repositories/cats/cats.schema';
import { CatsGateways } from 'src/repositories/cats/cats.gateways';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catsModel: Model<Cat>,
    private readonly catsGateways: CatsGateways,
  ) {}

  create(createCatsDto: CreateCatsDto): Promise<Cat> {
    return this.catsGateways.create(createCatsDto);
  }

  findAll(query): Promise<Cat[]> {
    return this.catsGateways.findAll(query);
  }

  findOne(id: string) {
    return this.catsModel.findById(id);
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    const persona = this.catsModel.findByIdAndUpdate(id, updateCatDto);
    return persona;
  }

  remove(id: string) {
    const persona = this.catsModel.findByIdAndDelete(id);
    return persona;
  }
}
