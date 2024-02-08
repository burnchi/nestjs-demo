import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

  constructor(private readonly coffeesService: CoffeesService) { }

  @Get()
  async findAll() {
    return this.coffeesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.coffeesService.findOne({
      id
    })
  }

  @Post()
  // async create(@Body() createCoffeeDto: { name: string, brand: string, flavors: string[] }) {
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update({
      where: {
        id
      },
      data: updateCoffeeDto
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.coffeesService.remove({
      id
    })
  }
}
