import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleDto } from './dto/ArticleDto';
import { ScheduleDto } from './dto/ScheduleDto';

@Injectable()
export class ManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  // article functions

  async addArticle(dto: ArticleDto) {
    const Article = await this.prismaService.articles.create({
      data: {
        title: dto.title,
        first_header: dto.first_header,
        first_body: dto.first_body,
        second_header: dto.second_header,
        third_header: dto.third_header,
        third_body: dto.third_body,
        authur: dto.authur,
      },
    });
    return { msg: 'مقاله اضافه شد', article: Article };
  }

  async addImage(file: any) {
    const image = await this.prismaService.articleImage.create({
      data: {
        buffer: file.buffer.toString('base64'),
        filename: file.originalname,
        article_id: 4,
      },
    });

    return { msg: 'عکس اضافه شد' };
  }

  async removeArticle(id: string) {
    const article = await this.prismaService.articles.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'مقاله حذف گردید ' };
  }

  // schedule functions

  async addSchedule(dto: ScheduleDto) {
    const schedule = await this.prismaService.schedule.create({
      data: {
        title: dto.title,
        teacher: dto.teacher,
        level: dto.level,
        days: dto.days,
        time: dto.time,
      },
    });
    return { msg: 'برنامه اضافه شد', schedule: schedule };
  }

  async updateSchedule(dto: ScheduleDto) {
    const schedule = await this.prismaService.schedule.updateMany({
      where: {
        id: Number(dto.schedule_id),
      },
      data: {
        title: dto.title,
        teacher: dto.teacher,
        level: dto.level,
        days: dto.days,
        time: dto.time,
      },
    });

    return { msg: 'برنامه به روزرسانی شد' };
  }

  async removeSchedule(id: string) {
    const schedule = await this.prismaService.schedule.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'برنامه حذف گردید' };
  }
}
