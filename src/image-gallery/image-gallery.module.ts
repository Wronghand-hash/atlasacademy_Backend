import { Module } from '@nestjs/common';
import { ImageGalleryController } from './image-gallery.controller';
import { ImageGalleryService } from './image-gallery.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService],
})
export class ImageGalleryModule {}
