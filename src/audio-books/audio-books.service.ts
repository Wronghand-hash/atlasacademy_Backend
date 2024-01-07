import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AudioBooksDto } from './dto/AudioBooksDto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AudioBooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBooks() {
    const audioBooks = await this.prismaService.audioBooks.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        AudioBooksImages: true,
      },
    });
    return { audioBooks: audioBooks };
  }

  async getLastFourBooks() {
    // const books = await this.prismaService.books.findMany({
    //   take: 4,
    //   select: {
    //     id: true,
    //     title: true,
    //     authur: true,
    //     image: true,
    //     description: true,
    //   },
    //   orderBy: {
    //     id: 'desc',
    //   },
    // });
    // return { books: books };
  }

  async getBooksById(id: string) {
    const book = await this.prismaService.audioBooks.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        file: true,
      },
    });
    return { book: book };
  }

  async getBookImage(id: string) {
    const image = await this.prismaService.audioBooksImages.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!image) {
      return new ForbiddenException('image not found');
    }
    const imageDataURL = `data:image/jpeg;base64,${image.data}`;
    return { image: imageDataURL };
  }

  // books management section

  async addImage(file: any, body: any) {
    const image = await this.prismaService.audioBooksImages.create({
      data: {
        data: file.buffer.toString('base64'),
        filename: file.originalname,
        audioBook_id: Number(body.bookId),
      },
    });
    return { msg: 'عکس اضافه شد' };
  }

  async addBook(file: any, dto: AudioBooksDto) {
    console.log(file.originalname);
    const audioBook = await this.prismaService.audioBooks.create({
      data: {
        title: dto.title,
        authur: dto.author,
        file: file.buffer.toString('base64'),
        filename: file.originalname,
        description: dto.description,
        date: dto.date,
      },
    });
    return { audioBook: audioBook };
  }

  async getTrack(id: string) {
    const track = await this.prismaService.audioBooks.findUnique({
      where: {
        id: 3,
      },
      select: {
        id: true,
        filename: true,
        file: true,
      },
    });
    return track;
  }

  async removeBookImage(id: string) {
    const image = await this.prismaService.audioBooksImages.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'عکس حذف گردید' };
  }

  async removeBook(id: string) {
    const book = await this.prismaService.audioBooks.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'کتاب حذف گردید ' };
  }
}
