import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Articles } from './articles.schema';
import { ArticlesDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel('articles') private articlesModel: Model<Articles>) {}

  /**
   * return all the articles
   * @return {Articles[]} all the articles ine the collection
   */
  async getArticles(): Promise<Articles[]> {
    return this.articlesModel.aggregate([]);
  }

  /**
   * return all the articles selected by the column = value couple
   * @param {string} field the name of the column
   * @param {string} value the discriminant
   * @return {Categories[]} the filtered articles in the collection
   */
  async getArticlesByField(field: string, value: string): Promise<Articles[]> {
    const query = {};
    query[field] = value;
    return this.articlesModel.aggregate([
      { $match: query }
    ])
  }

  /**
   * create one articles
   * @param {Articles} article the articles object
   * @return {Articles | string} error or success
   */
  async createArticles(article: Articles): Promise<Articles> {
    const newArticle = new this.articlesModel(article);
    return newArticle.save((err: unknown, returnedArticle: Articles) => {
      if (err) {
        throw new BadRequestException(err);
      }
      return `${returnedArticle.title} created`;
    })
  }

  /**
   * edit one articles
   * @param {string} id the articles mongo id
   * @param {object} updatedArticle the updated data
   * @return {Categories} the updated articles
   */
  async editArticles(id: string, updatedArticle: ArticlesDto): Promise<Articles> {
    return this.articlesModel.findOneAndUpdate({ _id: id }, updatedArticle);
  }

  /**
   * check if a article already exist in the db via the column = value couple
   * @param {string} field the name of the column
   * @param {string} value the discriminant
   * @return {boolean} article exist or not
   */
  async articleAlreadyExist(field: string, value: string): Promise<boolean> {
    const articleExist = await this.getArticlesByField(field, value);
    return articleExist.length > 0;
  }
}
