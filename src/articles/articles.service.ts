import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllArticles() {
    const articles = await this.prismaService.articles.findMany({});
    return { msg: 'all the articels', articles: articles };
  }
}
