import { PartialType } from '@nestjs/mapped-types';
import { TagtDto } from './tag.dto';

export class TagPatchDto extends PartialType(TagtDto) {}
