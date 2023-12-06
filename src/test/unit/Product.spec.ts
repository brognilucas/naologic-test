import Product from '../../domain/entities/Product';
test('should be able to create a product', () => {
  const product = new Product(
    'test-id',
    'test',
    'test-vendor-id',
    'test description',
    10,
  );

  expect(product.id).toEqual('test-id');
  expect(product.name).toEqual('test');
  expect(product.vendorId).toEqual('test-vendor-id');
  expect(product.description).toEqual('test description');
  expect(product.price).toEqual(10);
  expect(product.variants).toEqual([]);
});

test('Should be able to add a new variant to a product', () => {
  const product = new Product(
    'test-id',
    'test',
    'test-vendor-id',
    'test description',
    10,
  );
  product.addVariant(
    'variant-id',
    'description',
    'pk',
    10,
    true,
    'url-test',
    'img-test',
    '123',
  );
  expect(product.variants.length).toEqual(1);
});

test('should not be able to add a duplicated variant to a product', () => {
  const product = new Product(
    'test-id',
    'test',
    'test-vendor-id',
    'test description',
    10,
  );
  product.addVariant(
    'variant-id',
    'description',
    'pk',
    10,
    true,
    'url-test',
    'img-test',
    '123',
  );

  product.addVariant(
    'variant-id',
    'description',
    'pk',
    10,
    true,
    'url-test',
    'img-test',
    '123',
  );
  expect(product.variants.length).toEqual(1);
});
