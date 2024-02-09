import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CoffeesService {

  // use prisma client
  constructor(private prisma: DatabaseService) { }

  async create(data: Prisma.CoffeeCreateInput): Promise<Coffee> {
    return this.prisma.coffee.create({
      data
    })
  }

  async findAll(): Promise<Coffee[]> {
    return this.prisma.coffee.findMany();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.prisma.coffee.findUnique({
      where: {
        id
      }
    })
    // console.log(coffeeWhereUnique); // {id : 123}

    if (!coffee) {
      throw new NotFoundException(`Coffee not found`)
    }
    return coffee
  }


  async update(
    id: number,
    data: Prisma.CoffeeUpdateInput
  ): Promise<Coffee> {
    const coffee = await this.prisma.coffee.findUnique({
      where: {
        id
      }
    })

    if (!coffee) {
      throw new NotFoundException(`Coffee Not Found`)
    }

    return this.prisma.coffee.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: number): Promise<Coffee> {
    return this.prisma.coffee.delete({
      where: {
        id
      }
    })
  }
}
