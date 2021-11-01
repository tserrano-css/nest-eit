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
import { Tag } from './tag.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAll(): Tag[] {
    return this.tagsService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Tag {
    return this.tagsService.getId(id);
  }

  @Post()
  create(@Body() body): Tag {
    return this.tagsService.insert(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body): Tag {
    return this.tagsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): string {
    this.tagsService.delete(id);
    return `Borrado`;
  }
}
