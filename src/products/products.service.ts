import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductPatchDto } from './dto/product-patch.dto';
import { ProductDto } from './dto/product.dto';
import { QueryProductDto } from './dto/query-products.dto';
import { Product } from './entities/product.entity';
import { Size } from './entities/size.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  getAll(query: QueryProductDto): Promise<Product[]> {
    return this.productRepository.find({
      take: query.limit,
      where: [
        { name: Like(`%${query.query}%`) },
        { description: Like(`%${query.query}%`) },
      ],
      order: {
        [query.order]: 'ASC',
      },
    });
  }

  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (product) {
      return product;
    }
    throw new NotFoundException('No puedo encontrar el producto');
  }

  async insert(body: ProductDto): Promise<Product> {
    const sizes = await Promise.all(
      body.sizes.map((size) => this.selectOrCreateSize(size)),
    );
    const product = this.productRepository.create({ ...body, sizes });
    await this.productRepository.save(product);
    return product;
  }

  async update(
    id: number,
    body: ProductDto | ProductPatchDto,
  ): Promise<Product> {
    const sizes =
      body.sizes && //Si existe product.sizes en el ProductPatchDto
      (await Promise.all(
        body.sizes.map((size) => this.selectOrCreateSize(size)),
      ));

    const inputProduct = {
      id,
      ...body,
      sizes,
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

  private async selectOrCreateSize(size: string): Promise<Size> {
    const sizeEntity = await this.sizeRepository.findOne({ size });
    if (sizeEntity) {
      return sizeEntity;
    }
    return this.sizeRepository.create({ size });
  }
}
