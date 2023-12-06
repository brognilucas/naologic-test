import Product from 'src/domain/entities/Product';
import { ProductRepository } from 'src/domain/repositories/ProductRepository';

export class ProductRepositoryTest implements ProductRepository {
  products = [];
  constructor(private productModel: any) {}

  createOrUpdate(productId: string, product: Product): Promise<Product> {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return this.productModel
      .findOneAndUpdate({ id: productId }, product, options)
      .exec();
  }
}
