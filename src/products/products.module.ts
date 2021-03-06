import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { Size } from './entities/size.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, Size])],
  controllers: [ProductsController, ReviewController],
  providers: [ProductsService, ReviewService],
})
export class ProductsModule {}
