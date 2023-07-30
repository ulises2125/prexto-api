import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from 'src/cats/cats.service';
import { CatsController } from 'src/cats/cats.controller';
import { CatsGateways } from './cats.gateways';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService, CatsGateways],
})
export class CatsdbModule {}
