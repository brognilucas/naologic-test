import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobManager } from './infrastructure/cron/CronJobManager';
import ProcessProducts from './use-cases/ProcessProducts';
import ReadFile from './use-cases/ReadFile';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbModule } from './infrastructure/mongo/mongo.module';
import { FsService } from './infrastructure/fs-service/FSService';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/products-database'),
    MongodbModule,
  ],
  controllers: [],
  providers: [CronJobManager, ProcessProducts, ReadFile, FsService],
})
export class AppModule {}
