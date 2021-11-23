import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagPatchDto } from './dto/tag-patch.dto';
import { TagtDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  getAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async getId(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne(id);
    if (tag) {
      return tag;
    }
    throw new NotFoundException('No puedo encontrar el tag');
  }

  async insert(body: TagtDto): Promise<Tag> {
    const tag = this.tagRepository.create(body);
    await this.tagRepository.save(tag);
    return tag;
  }

  async update(id: number, body: TagtDto | TagPatchDto): Promise<Tag> {
    const inputTag = {
      id,
      ...body,
    };
    const tag = await this.tagRepository.preload(inputTag);

    if (tag) {
      return this.tagRepository.save(tag);
    }

    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }

  async delete(id: number): Promise<void> {
    const tag = await this.tagRepository.findOne(id);

    if (tag) {
      this.tagRepository.remove(tag);
    }
    throw new NotFoundException(`No se encontro el tag con id ${id}`);
  }
}
