import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksDto } from './dto/BooksDto';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBooks() {
    const books = await this.prismaService.books.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        file: false,
        category: true,
        BooksImages: true,
      },
    });
    return { books: books };
  }

  async getBooksByCategory(body: any) {
    const books = await this.prismaService.books.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        category: body.category,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        date: true,
        file: false,
        BooksImages: { select: { id: true } },
      },
    });
    return { books: books };
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
    const book = await this.prismaService.books.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        date: true,
        description: true,
        category: true,
      },
    });
    return { book: book };
  }

  async getBookImage(id: string) {
    const image = await this.prismaService.booksImages.findUnique({
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
    const image = await this.prismaService.booksImages.create({
      data: {
        data: file.buffer.toString('base64'),
        filename: file.originalname,
        book_id: Number(body.bookId),
      },
    });
    return { msg: 'عکس اضافه شد' };
  }

  async getBookFile(id: string) {
    const file = await this.prismaService.books.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        file: true,
      },
    });
    const pdfBuffer = Buffer.from(file.file, 'base64');
    return pdfBuffer;
  }

  async addBook(file: any, dto: BooksDto) {
    const book = await this.prismaService.books.create({
      data: {
        title: dto.title,
        authur: dto.author,
        file: file.buffer.toString('base64'),
        category: dto.category,
        description: dto.description,
        date: dto.date,
      },
    });
    return { book: book };
  }

  async removeBookImage(id: string) {
    const image = await this.prismaService.booksImages.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'عکس حذف گردید' };
  }

  async removeBook(id: string) {
    const book = await this.prismaService.books.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'کتاب حذف گردید ' };
  }
}
