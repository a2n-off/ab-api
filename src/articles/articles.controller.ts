import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.schema';
import { ArticlesDto } from './articles.dto';

@Controller('/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(): Promise<Articles[]> {
    return this.articlesService.getArticles();
  }

  @Get('/:column/:value')
  getArticlesByColumn(@Param() param: {[key: string]: string}): Promise<Articles[]> {
    const { column, value } = param;
    return this.articlesService.getArticlesByColumn(column, value);
  }

  @Post()
  createArticles(@Body() body: ArticlesDto): Promise<Articles> {
    return this.articlesService.createArticles(body as Articles);
  }

  @Put('/:id')
  editArticles(@Param() param: {[key: string]: string}, @Body() body: ArticlesDto): Promise<Articles> {
    const { id } = param;
    return this.articlesService.editArticles(id, body);
  }
}
