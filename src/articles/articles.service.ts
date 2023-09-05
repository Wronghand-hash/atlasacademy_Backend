import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllArticles() {
    const articles = await this.prismaService.articles.findMany({
      select: {
        id: true,
        title: true,
        authur: true,
        first_header: true,
        ArticleImage: true,
      },
    });
    return { msg: 'all the articels', articles: articles };
  }

  async getArticleById(id: string) {
    const article = await this.prismaService.articles.findUnique({
      where: {
        id: Number(id),
      },
    });

    return { article: article };
  }

  async getArticleImage(id: string) {
    const image = await this.prismaService.articleImage.findUnique({
      where: {
        id: Number(id),
      },
    });
    const imageDataURL = `data:image/jpeg;base64,${image.buffer}`;
    return { image: imageDataURL };
  }
}
