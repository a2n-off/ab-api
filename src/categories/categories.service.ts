import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './categories.schema';
import { Model } from 'mongoose';
import { CategoriesDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('categories') private categoriesModel: Model<Categories>) {}

  /**
   * return all the categories
   * @return {Categories[]} all the categories ine the collection
   */
  async getCategories(): Promise<Categories[]> {
    return this.categoriesModel.aggregate([]);
  }

  /**
   * return all the categories selected by the column = value couple
   * @param {string} column the name of the column
   * @param {string} value the discriminant
   * @return {Categories[]} the filtered categories in the collection
   */
  async getCategoriesByColumn(column: string, value: string): Promise<Categories[]> {
    const query = {};
    query[column] = value;
    return this.categoriesModel.aggregate([
      {$match: query}
    ])
  }

  /**
   * create one category
   * @param {Categories} data the category object
   * @return {Categories | string} error or success
   */
  async createCategory(data: Categories): Promise<Categories> {
    const category = new this.categoriesModel({name});
    return category.save((err: unknown, category: Categories) => {
      if (err) {
        throw new BadRequestException(err);
      }
      return `${category.name} created`;
    })
  }

  /**
   * edit one category
   * @param {string} id the category mongo id
   * @param {object} data the updated data
   * @return {Categories} the updated category
   */
  async editCategory(id: string, data: CategoriesDto): Promise<Categories> {
    return this.categoriesModel.findOneAndUpdate({ _id: id }, data);
  }
}
