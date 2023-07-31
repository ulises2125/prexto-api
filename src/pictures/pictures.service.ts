import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransformedImage } from 'src/interface/image.iterface';
import { FavoriteAddDto } from './dto/favorite-add.dto';

@Injectable()
export class PicturesService {
  private favoriteImages: CreatePictureDto[] = []; // Variable para almacenar las imágenes marcadas como favoritas
  constructor(private readonly httpService: HttpService) {}

  async getRandomCatImages(apiKey: string): Promise<TransformedImage[]> {
    const response = await firstValueFrom(
      this.httpService
        .get(`${process.env.API_URL}/search?limit=10`, {
          headers: {
            'x-api-key': apiKey,
          },
        })
        .pipe(
          map(({ data }) =>
            data.map((image) => ({
              id: image.id,
              url: image.url,
              width: image.width,
              height: image.height,
            })),
          ),
        ),
    );
    return response;
  }

  async markImageAsFavorite(
    body: FavoriteAddDto,
    apiKey: string,
  ): Promise<TransformedImage> {
    const imageId = body.id;

    const response = await firstValueFrom(
      this.httpService.get(`${process.env.API_URL}/${imageId}`, {
        headers: {
          'x-api-key': apiKey,
        },
      }),
    );

    const image = response.data;
    if (!image) {
      throw new NotFoundException(
        `No se encontró la imagen con id '${imageId}'.`,
      );
    }

    const favoriteImage: CreatePictureDto = {
      id: image.id,
      url: image.url,
      width: image.width,
      height: image.height,
    };
    if (this.favoriteImages.some((image) => image.id === favoriteImage.id)) {
      throw new BadRequestException(
        `La imagen con id '${favoriteImage.id}' ya está marcada como favorita.`,
      );
    }
    this.favoriteImages.push(favoriteImage); // Almacenar la imagen marcada como favorito

    return favoriteImage;
  }

  getAllFavoriteImages(): CreatePictureDto[] {
    return this.favoriteImages; // Obtener todas las imágenes marcadas como favoritas
  }
}
