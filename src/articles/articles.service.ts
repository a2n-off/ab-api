import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Articles } from './articles.schema';
import { Model } from 'mongoose';
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
   * @param {string} column the name of the column
   * @param {string} value the discriminant
   * @return {Categories[]} the filtered articles in the collection
   */
  async getArticlesByColumn(column: string, value: string): Promise<Articles[]> {
    const query = {};
    query[column] = value;
    return this.articlesModel.aggregate([
      {$match: query}
    ])
  }

  /**
   * create one articles
   * @param {Articles} data the articles object
   * @return {Articles | string} error or success
   */
  async createArticles(data: Articles): Promise<Articles> {
    const articles = new this.articlesModel(data);
    return articles.save((err: unknown, articles: Articles) => {
      if (err) {
        throw new BadRequestException(err);
      }
      return `${articles.title} created`;
    })
  }

  /**
   * edit one articles
   * @param {string} id the articles mongo id
   * @param {object} data the updated data
   * @return {Categories} the updated articles
   */
  async editArticles(id: string, data: ArticlesDto): Promise<Articles> {
    return this.articlesModel.findOneAndUpdate({ _id: id }, data);
  }
}
