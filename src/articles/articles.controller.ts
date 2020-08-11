import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.schema';
import { ArticlesDto } from './articles.dto';
import { AuthGuard } from '@nestjs/passport';
import { Levels } from '../security/decorator/levels.decorator';
import { LevelsGuard } from '../security/levels.guard';
import { LevelEnum } from '../common/enums/level.enum';
import { AuthUser } from '../common/decorators/request.decorator';
import { Users } from '../users/users.schema';

@UseGuards(AuthGuard('jwt'), LevelsGuard)
@Levels(LevelEnum.admin)
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
    return this.articlesService.getArticlesByField([{ field, value }]);
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
   * @param {Users} user the owner of the article pass through the jwt or admin user
   * @param {string} id the article id you want to edit
   * @param {ArticlesDto | BadRequestException | ConflictException} updatedArticle the updated article data
   */
  @Put('/:id')
  async editArticles(@AuthUser() user: Users, @Param('id') id: string, @Body() updatedArticle: ArticlesDto): Promise<Articles | BadRequestException | UnauthorizedException | ConflictException> {

    /** article doesn't exist */
    const articleExist = await this.articlesService.articleAlreadyExist('_id', id);
    if (!articleExist) {
      throw new BadRequestException(`${updatedArticle.title} doesn't exist`)
    }

    /** check if the user is the owner or admin */
    const isOwner = this.articlesService.checkArticleOwner(user, id);

    if (!isOwner) {
      throw new UnauthorizedException(`Your user is not authorized to modify this article`);
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

  /**
   * delete one article by id
   * @param {Users} user the owner
   * @param {string} id the article you want to delete
   * @return {Articles | BadRequestException} the deleted article
   */
  @Delete('/:id')
  async deleteArticle(@AuthUser() user: Users, @Param('id') id: string): Promise<Articles | BadRequestException> {
    /** article doesn't exist */
    const articleExist = await this.articlesService.articleAlreadyExist('_id', id);
    if (!articleExist) {
      throw new BadRequestException(`article ${id} doesn't exist`)
    }

    /** check if the user is the owner or admin */
    const isOwner = this.articlesService.checkArticleOwner(user, id);

    if (!isOwner) {
      throw new UnauthorizedException(`Your user is not authorized to delete this article`);
    }

    return this.articlesService.deleteArticle(id);
  }
}
