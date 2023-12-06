import Product from 'src/domain/entities/Product';

export default class ProductModelTest {
  products = [];
  findOneAndUpdate(filter: any, product: Product, options: any) {
    const existingProduct = this.products.findIndex(
      (product) => product.id === filter.id,
    );

    if (existingProduct === -1 && options.upsert) {
      this.products.push(product);
      return this.createDefaultResponse();
    }
    this.products[existingProduct] = product;
    return this.createDefaultResponse();
  }

  private createDefaultResponse() {
    return {
      exec: () => Promise.resolve(void 0),
    };
  }
}
