import { PartialType } from '@nestjs/mapped-types';
import { CreateCatsDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatsDto) {}
