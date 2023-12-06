import { Inject, Injectable, Logger } from '@nestjs/common';
import Product from '../domain/entities/Product';
import { ProductRepository } from '../domain/repositories/ProductRepository';

@Injectable()
export default class ProcessProducts {
  constructor(
    @Inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}
  private readonly logger = new Logger(ProcessProducts.name);

  async execute(products: any[]) {
    const productMap = new Map();
    for (const prod of products) {
      let product: Product | null = productMap.get(prod.ProductID) ?? null;

      if (!product) {
        product = new Product(
          prod.ProductID,
          prod.ProductName,
          prod.ManufacturerID,
          prod.ProductDescription,
          prod.UnitPrice,
        );
      }
      product.addVariant(
        prod.ItemID,
        prod.ItemDescription,
        prod.PKG,
        prod.UnitPrice,
        prod.QuantityOnHand > 0,
        prod.ItemImageURL,
        prod.ImageFileName,
        prod.NDCItemCode,
      );

      productMap.set(product.id, product);
    }

    const promises = [];

    for (const [productId, product] of productMap.entries()) {
      promises.push(this.productRepository.createOrUpdate(productId, product));
    }

    await Promise.all(promises);

    this.logger.log(`${productMap.size} products processed`);
    return productMap;
  }
}
