import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepository } from 'src/domain/repositories/ProductRepository';
import Product from 'src/domain/entities/Product';

@Injectable()
export class ProductRepositoryMongoDB implements ProductRepository {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  createOrUpdate(productId: string, product: Product): Promise<Product> {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return this.productModel
      .findOneAndUpdate({ id: productId }, product, options)
      .exec();
  }
}
