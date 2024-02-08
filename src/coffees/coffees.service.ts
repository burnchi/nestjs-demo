import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Coffee, Prisma } from '@prisma/client';

@Injectable()
export class CoffeesService {

  // use prisma client
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Coffee[]> {
    return this.prisma.coffee.findMany();
  }

  async findOne(coffeeWhereUnique: Prisma.CoffeeWhereUniqueInput) {
    const coffee = await this.prisma.coffee.findUnique({
      where: coffeeWhereUnique
    })
    // console.log(coffeeWhereUnique); // {id : 123}


    if (!coffee) {
      throw new NotFoundException(`Coffee not found`)
    }
    return coffee
  }

  async create(data: Prisma.CoffeeCreateInput) {
    return this.prisma.coffee.create({
      data
    })
  }

  async update(params: {
    where: Prisma.CoffeeWhereUniqueInput,
    data: Prisma.CoffeeUpdateInput
  }): Promise<Coffee> {
    const { where, data } = params;
    const coffee = await this.prisma.coffee.findUnique({ where })

    if (!coffee) {
      throw new NotFoundException(`Coffee Not Found`)
    }

    return this.prisma.coffee.update({
      data,
      where
    })
  }

  async remove(where: Prisma.CoffeeWhereUniqueInput): Promise<Coffee> {
    return this.prisma.coffee.delete({
      where
    })
  }
}
