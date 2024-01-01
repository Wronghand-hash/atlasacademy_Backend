import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleDto } from './dto/ArticleDto';
import { ScheduleDto } from './dto/ScheduleDto';
import { VideosDto } from './dto/VideoDto';
import { NewsDto } from './dto/NewsDto';
@Injectable()
export class ManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  // article functions

  async getArticles() {
    const articles = await this.prismaService.articles.findMany({
      select: {
        id: true,
        title: true,
        authur: true,
        first_header: true,
        ArticleImage: { select: { id: true, article_id: true } },
      },
    });
    return { msg: 'all the articels', articles: articles };
  }

  async addArticle(dto: ArticleDto) {
    const Article = await this.prismaService.articles.create({
      data: {
        title: dto.title,
        first_header: dto.first_header,
        first_body: dto.first_body,
        second_header: dto.second_header,
        second_body: dto.second_body,
        third_header: dto.third_header,
        third_body: dto.third_body,
        authur: dto.authur,
      },
    });
    return { msg: 'مقاله اضافه شد', article: Article };
  }

  async addImage(file: any, body: any) {
    console.log(body);
    const image = await this.prismaService.articleImage.create({
      data: {
        buffer: file.buffer.toString('base64'),
        filename: file.originalname,
        article_id: Number(body.articleId),
      },
    });

    return { msg: 'عکس اضافه شد' };
  }

  async removeArticleImage(id: string) {
    const image = await this.prismaService.articleImage.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'عکس حذف گردید' };
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
    const schedule = await this.prismaService.schedules.create({
      data: {
        title: dto.title,
      },
    });
    return { msg: 'برنامه اضافه شد', schedule: schedule };
  }

  async updateSchedule(dto: ScheduleDto) {
    const schedule = await this.prismaService.schedules.updateMany({
      where: {
        id: Number(dto.schedule_id),
      },
      data: {
        title: dto.title,
      },
    });

    return { msg: 'برنامه به روزرسانی شد' };
  }

  async addScheduleImage(file: any, body: any) {
    console.log(body.scheduleId);
    const scheduleImage = await this.prismaService.schedules.updateMany({
      where: {
        id: Number(body.scheduleId),
      },
      data: {
        image_buffer: file.buffer.toString('base64'),
        image_name: file.originalname,
      },
    });

    return { msg: 'عکس اضافه شد' };
  }

  async removeSchedule(id: string) {
    const schedule = await this.prismaService.schedules.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'برنامه حذف گردید' };
  }

  // video management functions

  async getAllVideos() {
    const videos = await this.prismaService.videos.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        image_buffer: true,
      },
    });

    return { videos: videos };
  }

  async addVideo(file: any, body: any) {
    console.log(body);
    const video = await this.prismaService.videos.create({
      data: {
        title: body.title,
        file: file.buffer.toString('base64'),
        description: body.description,
      },
    });

    return { video: video };
  }

  async addVideoImage(file: any, body: any) {
    console.log(body.videoId);
    const videoImage = await this.prismaService.videos.updateMany({
      where: {
        id: Number(body.videoId),
      },
      data: {
        image_buffer: file.buffer.toString('base64'),
      },
    });

    return { msg: 'عکس اضافه شد' };
  }

  async removeVideo(id: string) {
    const video = await this.prismaService.videos.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'ویدیو حذف شد' };
  }

  // news functions

  async getNews() {
    const news = await this.prismaService.news.findMany({
      select: {
        id: true,
        title: true,
        authur: true,
        first_header: true,
        NewsImages: { select: { id: true, news_id: true } },
      },
    });
    return { msg: 'all news ', news: news };
  }

  async addNews(dto: NewsDto) {
    const news = await this.prismaService.news.create({
      data: {
        title: dto.title,
        first_header: dto.first_header,
        first_body: dto.first_body,
        second_header: dto.second_header,
        second_body: dto.second_body,
        third_header: dto.third_header,
        third_body: dto.third_body,
        authur: dto.authur,
        category: dto.category,
      },
    });
    return { msg: 'مقاله اضافه شد', news: news };
  }

  async addNewsImage(file: any, body: any) {
    console.log(body);
    const image = await this.prismaService.newsImages.create({
      data: {
        data: file.buffer.toString('base64'),
        filename: file.originalname,
        news_id: Number(body.newsId),
      },
    });

    return { msg: 'عکس اضافه شد' };
  }

  async removeNewsImage(id: string) {
    const image = await this.prismaService.newsImages.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'عکس حذف گردید' };
  }

  async removeNews(id: string) {
    const article = await this.prismaService.news.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'مقاله حذف گردید ' };
  }
}
