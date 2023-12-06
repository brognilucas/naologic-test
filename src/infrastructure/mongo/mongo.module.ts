import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/ProductSchema';
import { ProductRepositoryMongoDB } from '../repositories/ProductRepositoryMongoDB';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [
    {
      useClass: ProductRepositoryMongoDB,
      provide: 'ProductRepository',
    },
  ],
  exports: ['ProductRepository'],
})
export class MongodbModule {}
