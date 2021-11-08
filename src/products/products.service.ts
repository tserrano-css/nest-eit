import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPatchDto } from './dto/product-patch.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
      stock: 0,
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
      stock: 12,
    },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getId(id: number): Product {
    const product = this.products.find((item) => item.id == id);
    if (product) {
      return product;
    }
    throw new NotFoundException('No puedo ');
  }

  insert(body: ProductDto): Product {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: body.name,
        description: body.description,
        stock: body.stock,
      },
    ];

    return this.getId(this.lastId());
  }

  update(id: number, body: ProductDto): Product {
    const product: Product = {
      id,
      name: body.name,
      description: body.description,
      stock: body.stock,
    };

    return this.updateObject(id, product);
  }

  private updateObject(id: number, product: Product) {
    this.products = this.products.map((item) => {
      return item.id == id ? product : item;
    });

    return this.getId(id);
  }

  patch(id: number, body: ProductPatchDto): Product {
    const previousProduct = this.getId(id);

    //això és que fa es possar en el newProduct tot ho de previousProduct i sobre escriure el que tingui en el body
    const newProduct = {
      ...previousProduct,
      ...body,
    }

    return this.updateObject(id, newProduct);

  }

  delete(id: number): void {
    this.products = this.products.filter((item) => item.id != id);
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }
}
