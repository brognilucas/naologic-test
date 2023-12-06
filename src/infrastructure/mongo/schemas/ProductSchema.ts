import { Schema, Document } from 'mongoose';
import { VariantSchema, VariantDocument } from './VariantSchema';

export const ProductSchema = new Schema({
  id: String,
  name: String,
  vendorId: String,
  description: String,
  price: Number,
  variants: [VariantSchema],
});

export interface ProductDocument extends Document {
  id: string;
  name: string;
  vendorId: string;
  description: string;
  price: number;
  variants?: VariantDocument[];
}
