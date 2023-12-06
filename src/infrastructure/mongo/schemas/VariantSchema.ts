import { Schema, Document } from 'mongoose';
import { ImageSchema, ImageDocument } from './ImageSchema';

export const VariantSchema = new Schema({
  id: String,
  description: String,
  price: Number,
  packaging: String,
  available: Boolean,
  images: [ImageSchema],
  itemCode: String,
});

export interface VariantDocument extends Document {
  id: string;
  description: string;
  price: number;
  packaging: string;
  available: boolean;
  images?: ImageDocument[];
  itemCode?: string;
}
