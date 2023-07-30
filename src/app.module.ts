import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsdbModule } from './repositories/cats/cats-db.modules';
import { PicturesModule } from './pictures/pictures.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MY_DATABASE,
      }),
    }),
    CatsdbModule,
    PicturesModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
