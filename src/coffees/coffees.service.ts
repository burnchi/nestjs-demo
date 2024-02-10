import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Coffee, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoffeesService {

  // use prisma client
  constructor(
    private prisma: DatabaseService,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configServer: ConfigService
  ) {
    console.log(coffeeBrands);
    console.log(this.configServer.get('DATABASE_URL'));
    // console.log(process.env.DATABASE_URL);

  }

  async create(data: Prisma.CoffeeCreateInput): Promise<Coffee> {
    return this.prisma.coffee.create({
      data
    })
  }

  async findAll(offset?: number, limit?: number): Promise<Coffee[]> {
    return this.prisma.coffee.findMany({
      take: limit,
      skip: offset,
      include: {
        flavors: true
      },
    });
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.prisma.coffee.findUnique({
      where: {
        id
      },
      include: {
        flavors: true
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
