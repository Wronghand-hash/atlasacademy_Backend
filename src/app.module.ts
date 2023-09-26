/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ManagementModule } from './management/management.module';
import { ArticlesModule } from './articles/articles.module';
import { SchedulesModule } from './schedules/schedules.module';
import { MulterModule } from '@nestjs/platform-express';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024, // set your desired file size limit
      },
    }),
    ConfigModule.forRoot(),
    UserModule,
    ExamModule,
    PrismaModule,
    ManagementModule,
    ArticlesModule,
    SchedulesModule,
    VideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
