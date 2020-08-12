import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './categories.schema';
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
   * @param {string} field the name of the column
   * @param {string} value the discriminant
   * @return {Categories[]} the filtered categories in the collection
   */
  async getCategoriesByField(field: string, value: string): Promise<Categories[]> {
    const query = {};
    query[field] = value;
    return this.categoriesModel.aggregate([
      { $match: query }
    ])
  }

  /**
   * create one category
   * @param {Categories} category the category object
   * @return {Categories | string} error or success
   */
  async createCategory(category: Categories): Promise<Categories | BadRequestException> {
    const newCategory = new this.categoriesModel(category);
    return newCategory.save((err: unknown, returnedCategory: Categories) => {
      if (err) {
        throw new BadRequestException(err);
      }
      return `${returnedCategory.name} created`;
    })
  }

  /**
   * edit one category
   * @param {string} id the category mongo id
   * @param {CategoriesDto} updatedCategory the updated data
   * @return {Categories} the updated category
   */
  async editCategory(id: string, updatedCategory: CategoriesDto): Promise<Categories> {
    return this.categoriesModel.findOneAndUpdate({ _id: id }, updatedCategory);
  }

  /**
   * check if a category already exist in the db via the column = value couple
   * @param {string} field the name of the column
   * @param {string} value the discriminant
   * @return {boolean} category exist or not
   */
  async categoryAlreadyExist(field: string, value: string): Promise<boolean> {
    const categoryExist = await this.getCategoriesByField(field, value);
    return categoryExist.length > 0;
  }

  /**
   * delete one category by this id
   * @param {string} id the category id you want to delete
   * @return {Users} the deleted category
   */
  async deleteCategory(id: string): Promise<Categories> {
    return this.categoriesModel.findByIdAndDelete(id);
  }
}
