import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllNews() {
    const news = await this.prismaService.news.findMany({
      select: {
        id: true,
        title: true,
        authur: true,
        first_header: true,
        NewsImages: true,
      },
    });
    return { msg: 'all news ', news: news };
  }

  async getNewsByCategory(category: string) {
    const news = await this.prismaService.news.findMany({
      where: {
        category: category,
      },
      select: {
        id: true,
        title: true,
        authur: true,
        first_header: true,
        NewsImages: true,
        first_body: true,
        second_body: true,
        second_header: true,
        third_body: true,
        third_header: true,
        date: true,
      },
    });

    return { news: news };
  }

  async getNewsById(id: string) {
    const news = await this.prismaService.news.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        authur: true,
        first_header: true,
        NewsImages: true,
        first_body: true,
        second_body: true,
        second_header: true,
        third_body: true,
        third_header: true,
        date: true,
      },
    });

    return { news: news };
  }

  async getNewsImage(id: string) {
    const image = await this.prismaService.newsImages.findUnique({
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
}
