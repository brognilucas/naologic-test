import Product from '../../domain/entities/Product';
import ProcessProducts from '../../use-cases/ProcessProducts';
import ProductModelTest from '../test-implementation/ProductModelTest';
import { ProductRepositoryTest } from '../test-implementation/ProductRepositoryTest';

const mockProduct = {
  SiteSource: 'AIM',
  ItemID: '10289480',
  ManufacturerID: '563',
  ManufacturerCode: '10000701',
  ManufacturerName: 'BSN Medical/Jobst',
  ProductID: '10033525',
  ProductName: 'BSN MEDICAL JOBST� ULTRASHEER COMPRESSION STOCKINGS',
  ProductDescription:
    'Seamless circular knitted for a soft, silky look and comfortable feel. Reciprocated heel and toe for better fit and durability. Maternity styles provide a little "extra" for the mother-to-be. Assorted colors. Available in knee high, thigh high and pantyhose styles.',
  ManufacturerItemCode: '121529',
  ItemDescription:
    'Compression Stocking, Waist High, 20-30 mmHG, Closed Toe, Suntan, Small',
  ImageFileName: '',
  ItemImageURL: '',
  NDCItemCode: 'BSN 121529',
  PKG: 'pr',
  UnitPrice: '76.7900',
  QuantityOnHand: '0',
  PriceDescription: '',
  Availability: '14-21 Days',
  PrimaryCategoryID: '12',
  PrimaryCategoryName: 'Orthopedic & Physical Therapy',
  SecondaryCategoryID: '115',
  SecondaryCategoryName: 'Soft Goods',
  CategoryID: '742',
  CategoryName: 'Compression',
  IsRX: 'N',
  IsTBD: 'N',
};

describe('ProcessProducts', () => {
  let repository: ProductRepositoryTest;
  let processProduct: ProcessProducts;
  let model: ProductModelTest;
  beforeEach(() => {
    model = new ProductModelTest()
    repository = new ProductRepositoryTest(model);
    processProduct = new ProcessProducts(repository);
  });

  test('should be able to process a product with one variant', async () => {
    const response = await processProduct.execute([mockProduct]);

    const product = response.get(mockProduct.ProductID);
    expect(response.size).toEqual(1);
    expect(product).not.toBeNull();
    expect(product).toBeInstanceOf(Product);
    expect(product.variants).toHaveLength(1);
    expect(product.id).toEqual(mockProduct.ProductID);
    expect(product.name).toEqual(mockProduct.ProductName);
    expect(product.description).toEqual(mockProduct.ProductDescription);
    expect(product.price).toEqual(mockProduct.UnitPrice);

    expect(model.products).toHaveLength(1);
  });

  test('should be able to process a list of products and aggregate their variants', async () => {
    const cloneMockSecondVariant = {
      ...mockProduct,
      ItemID: 'random-item-id',
      ItemDescription: 'random-item-description',
      PKG: 'random-packaging',
    };

    const response = await processProduct.execute([
      mockProduct,
      cloneMockSecondVariant,
    ]);

    const product = response.get(mockProduct.ProductID);
    expect(response.size).toEqual(1);
    expect(product).not.toBeNull();
    expect(product).toBeInstanceOf(Product);
    expect(product.variants).toHaveLength(2);
    expect(product.id).toEqual(mockProduct.ProductID);
    expect(product.name).toEqual(mockProduct.ProductName);
    expect(product.description).toEqual(mockProduct.ProductDescription);
    expect(product.price).toEqual(mockProduct.UnitPrice);
    expect(
      product.variants.some(
        (variant) => variant.id === cloneMockSecondVariant.ItemID,
      ),
    ).toEqual(true);
    expect(
      product.variants.some((variant) => variant.id === mockProduct.ItemID),
    ).toEqual(true);

    expect(model.products).toHaveLength(1);
  });

  test('should be able to process a list of products with different ids and aggregate their variants', async () => {
    const cloneMockSecondVariant = {
      ...mockProduct,
      ItemID: 'random-item-id',
      ItemDescription: 'random-item-description',
      PKG: 'random-packaging',
    };

    const secondMockProduct = {
      ...mockProduct,
      ProductID: 'random-product-id',
    };

    const response = await processProduct.execute([
      mockProduct,
      secondMockProduct,
      cloneMockSecondVariant,
    ]);

    const product = response.get(mockProduct.ProductID);
    const secondProduct = response.get(secondMockProduct.ProductID);
    expect(response.size).toEqual(2);
    expect(product).not.toBeNull();
    expect(product).toBeInstanceOf(Product);
    expect(secondProduct).not.toBeNull();
    expect(secondProduct).toBeInstanceOf(Product);

    expect(model.products).toHaveLength(2);
  });
});
