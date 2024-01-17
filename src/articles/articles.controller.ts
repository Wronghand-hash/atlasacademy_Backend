import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get('')
  getAllArticles() {
    return this.articleService.getAllArticles();
  }

  @Get('/category/:category')
  getArticlesByCategory(@Param('category') category: string) {
    console.log('corecto cuz');
    return this.articleService.getArticlesByCategory(category);
  }

  @Get('fourarticle')
  getFourArticles() {
    return this.articleService.getFourArticles();
  }

  @Get(':id')
  getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @Get('image/:id')
  getArticleImage(@Param('id') id: string) {
    return this.articleService.getArticleImage(id);
  }
}
