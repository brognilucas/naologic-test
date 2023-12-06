import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import ProcessProducts from 'src/use-cases/ProcessProducts';
import ReadFile from 'src/use-cases/ReadFile';

@Injectable()
export class CronJobManager {
  private readonly logger = new Logger(CronJobManager.name);

  constructor(
    private readFileUseCase: ReadFile,
    private processProducts: ProcessProducts,
  ) {}

  @Cron('0 35 14 * * *	')
  async handleCron() {
    this.logger.log('processing file');
    const products = await this.readFileUseCase.execute('files/images40.txt');
    await this.processProducts.execute(products);
  }
}
