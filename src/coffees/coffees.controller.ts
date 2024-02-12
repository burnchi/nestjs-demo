import { Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/ParseIntPipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCoffeeDto } from './dtos/CreateCoffeeDto.dto';
import { UpdateCoffeeDto } from './dtos/UpdateCoffeeDto.dto';

@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {

  constructor(private readonly coffeesService: CoffeesService) { }

  // @Protocol('https') protocol: string,
  // @SetMetadata('isPublic',true)
  @Public()
  @Get()
  async findAll(@Query() { offset, limit }: PaginationQueryDto) {
    // delay 5 s
    // await new Promise(resolve => setTimeout(resolve, 5000))
    // console.log(protocol);

    return this.coffeesService.findAll(offset, limit)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);

    return this.coffeesService.findOne(+id)
  }

  @Public()
  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id)
  }
}
