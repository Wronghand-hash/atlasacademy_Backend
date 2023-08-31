import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get('/getall')
  getAllArticles() {
    return this.articleService.getAllArticles();
  }
}
