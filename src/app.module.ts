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
import { Controller } from './.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    ExamModule,
    PrismaModule,
    ManagementModule,
  ],
  controllers: [AppController, Controller],
  providers: [AppService],
})
export class AppModule {}
