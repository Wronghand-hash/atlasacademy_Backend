/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
