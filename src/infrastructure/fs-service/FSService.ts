/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FsService {
  readFileSync(path: string, encoding: any): string {
    return fs.readFileSync(path, encoding) as unknown as string;
  }
}
