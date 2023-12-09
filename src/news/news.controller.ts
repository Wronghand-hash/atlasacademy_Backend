import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsServices: NewsService) {}

  @Get('')
  getAllArticles() {
    return this.newsServices.getAllNews();
  }

  //   @Get('fourarticle')
  //   getFourArticles() {
  //     return this.newsServices.getFourArticles();
  //   }

  @Get(':id')
  getArticleById(@Param('id') id: string) {
    return this.newsServices.getNewsById(id);
  }

  @Get('image/:id')
  getArticleImage(@Param('id') id: string) {
    return this.newsServices.getNewsImage(id);
  }
}
