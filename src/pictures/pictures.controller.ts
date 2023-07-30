import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { FavoriteAddDto } from './dto/favorite-add.dto';

@Controller('images')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get()
  async getRandomCatImage() {
    const images = await this.picturesService.getRandomCatImages(
      process.env.CAT_API_KEY,
    );
    return images;
  }

  @Post('/favorites')
  async markImageAsFavorite(@Body() body: FavoriteAddDto) {
    const image = await this.picturesService.markImageAsFavorite(
      body,
      process.env.CAT_API_KEY,
    );
    return { message: 'Imagen marcada como favorita', image };
  }

  @Get('favorites')
  getAllFavoriteImages(): CreatePictureDto[] {
    return this.picturesService.getAllFavoriteImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.picturesService.update(+id, updatePictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.picturesService.remove(+id);
  }
}
