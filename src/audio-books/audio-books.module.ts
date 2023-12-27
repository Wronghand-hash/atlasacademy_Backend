import { Module } from '@nestjs/common';
import { AudioBooksController } from './audio-books.controller';
import { AudioBooksService } from './audio-books.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AudioBooksController],
  providers: [AudioBooksService],
})
export class AudioBooksModule {}
