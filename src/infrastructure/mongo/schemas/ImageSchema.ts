import { Schema, Document } from 'mongoose';

export const ImageSchema = new Schema({
  id: String,
  cdnLink: String,
  fileName: String,
});

export interface ImageDocument extends Document {
  id: string;
  cdnLink: string;
  fileName: string;
}
