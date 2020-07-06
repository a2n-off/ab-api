import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.schema';
import { CategoriesDto } from './categories.dto';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Categories[]> {
    return this.categoriesService.getCategories();
  }

  @Get('/:column/:value')
  getCategoriesByColumn(@Param() param: {[key: string]: string}): Promise<Categories[]> {
    const { column, value } = param;
    return this.categoriesService.getCategoriesByColumn(column, value);
  }

  @Post()
  createCategories(@Body() body: CategoriesDto): Promise<Categories> {
    return this.categoriesService.createCategory(body as Categories);
  }

  @Put('/:id')
  editCategory(@Param() param: {[key: string]: string}, @Body() body: CategoriesDto): Promise<Categories> {
    const { id } = param;
    return this.categoriesService.editCategory(id, body);
  }
}
