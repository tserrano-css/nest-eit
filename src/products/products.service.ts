import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPatchDto } from './dto/product-patch.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (product) {
      return product;
    }
    throw new NotFoundException('No puedo encontrar el producto');
  }

  async insert(body: ProductDto): Promise<Product> {
    const product = this.productRepository.create(body);
    await this.productRepository.save(product);
    return product;
  }

  async update(
    id: number,
    body: ProductDto | ProductPatchDto,
  ): Promise<Product> {
    const inputProduct = {
      id,
      ...body,
    };
    const product = await this.productRepository.preload(inputProduct);

    if (product) {
      return this.productRepository.save(product);
    }

    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findOne(id);

    if (product) {
      this.productRepository.remove(product);
    }
    throw new NotFoundException(`No se encontro el producto con id ${id}`);
  }
}
