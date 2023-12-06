import Product from '../entities/Product';

export interface ProductRepository {
  createOrUpdate(productId: string, product: Product): Promise<Product>;
}
