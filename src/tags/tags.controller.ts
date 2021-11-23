import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAll(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Tag> {
    return this.tagsService.getId(id);
  }

  @Post()
  async create(@Body() body): Promise<Tag> {
    return this.tagsService.insert(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body): Promise<Tag> {
    return this.tagsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): string {
    this.tagsService.delete(id);
    return `Borrado`;
  }
}
