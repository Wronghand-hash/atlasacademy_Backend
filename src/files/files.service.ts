import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesDto } from './dto/FilesDto';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFiles() {
    const files = await this.prismaService.files.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        group: true,
        date: true,
      },
    });
    return { files: files };
  }

  async byCategory(category: string) {
    const files = await this.prismaService.files.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        group: category,
      },
      select: {
        id: true,
        title: true,
        group: true,
        date: true,
        file: false,
      },
    });
    return { files: files };
  }

  async getFileById(id: string) {
    const file = await this.prismaService.files.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        group: true,
      },
    });
    return { file: file };
  }
  async getFile(id: string) {
    const file = await this.prismaService.files.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        file: true,
        filename: true,
      },
    });
    const pdfBuffer = Buffer.from(file.file, 'base64');
    return { file: pdfBuffer, filename: file.filename };
  }
  async addFile(file: any, dto: FilesDto) {
    const files = await this.prismaService.files.create({
      data: {
        title: dto.title,
        group: dto.group,
        file: file.buffer.toString('base64'),
        filename: file.originalname,
        date: dto.date,
      },
    });
    return { files: files };
  }

  async removeFile(id: string) {
    const file = await this.prismaService.files.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'فایل حذف گردید ' };
  }
}
