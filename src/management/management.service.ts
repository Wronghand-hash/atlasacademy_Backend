import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleDto } from './dto/ArticleDto';

@Injectable()
export class ManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  async addArticle(dto: ArticleDto) {
    const Article = await this.prismaService.articles.create({
      data: {
        title: dto.title,
        body: dto.body,
        authur: dto.authur,
      },
    });
    return { msg: 'article added to database', article: Article };
  }
}
