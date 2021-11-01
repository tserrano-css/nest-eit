import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from './tag.interface';


@Injectable()
export class TagsService {
  private tags: Tag[] = [
    {
      id: 1,
      name: 'Muebles',
      slug: 'muebles',
    },
    {
      id: 2,
      name: 'Accesorios',
      slug: 'asccesorios',
    },
  ];

  getAll(): Tag[] {
    return this.tags;
  }

  getId(id: number): Tag {
    const tag = this.tags.find((item) => item.id == id);
    if (tag) {
      return tag;
    }
    throw new NotFoundException('No puedo ');
  }

  insert(body: any): Tag {
    this.tags = [
      ...this.tags,
      {
        id: this.lastId() + 1,
        name: body.name,
        slug: body.slug,
      },
    ];

    return this.getId(this.lastId());
  }

  update(id: number, body: any): Tag {
    const product: Tag = {
      id,
      name: body.name,
      slug: body.slug,
    };

    this.tags = this.tags.map((item) => {
      return item.id == id ? product : item;
    });

    return this.getId(id);
  }

  delete(id: number): void {
    this.tags = this.tags.filter((item) => item.id != id);
  }

  private lastId(): number {
    return this.tags[this.tags.length - 1].id;
  }
}
