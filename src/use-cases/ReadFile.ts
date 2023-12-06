import { Injectable } from '@nestjs/common';
import { FsService } from '../infrastructure/fs-service/FSService';

@Injectable()
export default class ReadFile {
  constructor(private readonly fsService: FsService) {}

  async execute(filePath: string) {
    const fileContent = this.fsService.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').map((line) => line.split('\t'));
    const header = lines[0];
    const products = [];

    for (let i = 1; i < lines.length - 1; i++) {
      const product = {};
      const currentLine = lines[i];

      for (let j = 0; j < header.length; j++) {
        product[header[j]] = currentLine[j];
      }

      products.push(product);
    }
    return products;
  }
}
