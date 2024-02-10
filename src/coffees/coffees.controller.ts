import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from './dtos/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {

  constructor(private readonly coffeesService: CoffeesService) { }

  @Get()
  async findAll(@Query() { offset, limit }: PaginationQueryDto) {
    return this.coffeesService.findAll(offset, limit)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id)
  }

  @Post()
  async create(@Body() createCoffeeDto: Prisma.CoffeeCreateInput) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: Prisma.CoffeeUpdateInput) {
    return this.coffeesService.update(+id, updateCoffeeDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id)
  }
}
