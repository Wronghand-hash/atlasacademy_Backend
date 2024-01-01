import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsServices: NewsService) {}

  @Get('')
  getAllArticles() {
    return this.newsServices.getAllNews();
  }

  @Get('/category/:category')
  getNewsByCategory(@Param('category') category: string) {
    console.log('corecto cuz');
    return this.newsServices.getNewsByCategory(category);
  }

  @Get(':id')
  getArticleById(@Param('id') id: string) {
    return this.newsServices.getNewsById(id);
  }

  @Get('image/:id')
  getArticleImage(@Param('id') id: string) {
    return this.newsServices.getNewsImage(id);
  }
}
