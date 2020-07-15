import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.schema';
import { ArticlesDto } from './articles.dto';

@Controller('/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * return all the article
   * @return {Articles[]} the articles collection
   */
  @Get()
  getArticles(): Promise<Articles[]> {
    return this.articlesService.getArticles();
  }

  /**
   * return all the filtered article
   * @param {string} field the field name
   * @param {string} value the value to filter the data
   * @return {Articles[]} the filtered article
   */
  @Get('/:field/:value')
  getArticlesByColumn(@Param('field') field: string, @Param('value') value: string): Promise<Articles[]> {
    return this.articlesService.getArticlesByField(field, value);
  }

  /**
   * create one article
   * @param {ArticlesDto} article the article data
   * @return {Articles | ConflictException} the created article
   */
  @Post()
  async createArticles(@Body() article: ArticlesDto): Promise<Articles | ConflictException> {

    /** article title already exist */
    if (await this.articlesService.articleAlreadyExist('title', article.title)) {
      throw new ConflictException(`${article.title} already exist`)
    }

    return this.articlesService.createArticles(article as Articles);
  }

  /**
   * edit one article
   * @param {string} id the article id you want to edit
   * @param {ArticlesDto | BadRequestException | ConflictException} updatedArticle the updated article data
   */
  @Put('/:id')
  async editArticles(@Param('id') id: string, @Body() updatedArticle: ArticlesDto): Promise<Articles | BadRequestException | ConflictException> {

    /** article doesn't exist */
    const articleExist = await this.articlesService.articleAlreadyExist('_id', id);
    if (!articleExist) {
      throw new BadRequestException(`${updatedArticle.title} doesn't exist`)
    }

    /** updated article title already exist */
    if (updatedArticle.title) {
      const articleTitleExist = await this.articlesService.articleAlreadyExist('title', updatedArticle.title);
      if (articleTitleExist) {
        throw new ConflictException(`${updatedArticle.title} already exist`)
      }
    }

    return this.articlesService.editArticles(id, updatedArticle);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string): Promise<Articles | BadRequestException> {
    /** article doesn't exist */
    const articleExist = await this.articlesService.articleAlreadyExist('_id', id);
    if (!articleExist) {
      throw new BadRequestException(`article ${id} doesn't exist`)
    }
    return this.articlesService.deleteArticle(id);
  }
}
