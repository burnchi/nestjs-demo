import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService } from '@nestjs/config';
import { FlavorEntity } from './entities/flavor.entity';
import { CreateCoffeeDto } from './dtos/CreateCoffeeDto.dto';
import { UpdateCoffeeDto } from './dtos/UpdateCoffeeDto.dto';
import { CoffeeEntity } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {

  // use prisma client
  constructor(
    private prisma: DatabaseService,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configServer: ConfigService
  ) {
    // console.log(coffeeBrands);
    // console.log(this.configServer.get('DATABASE_URL'));
    // console.log(process.env.DATABASE_URL);

  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeEntity> {
    const flavorsid = createCoffeeDto.flavors && (
      await Promise.all(
        createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
      )
    )
    // console.log(flavorsid); //if no flavor ,output: undefined

    return this.prisma.coffee.create({
      data: {
        ...createCoffeeDto,
        flavors: {
          connect: flavorsid
        }
      },
      include: {
        flavors: true
      }
    })
  }

  async findAll(offset?: number, limit?: number): Promise<CoffeeEntity[]> {
    return this.prisma.coffee.findMany({
      take: limit,
      skip: offset,
      // include: {
      //   flavors: true
      // },
    });
  }

  async findOne(id: number): Promise<CoffeeEntity> {
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
    updateCoffeeDto: UpdateCoffeeDto
  ): Promise<CoffeeEntity> {
    const coffee = await this.prisma.coffee.findUnique({
      where: {
        id
      }
    })

    if (!coffee) {
      throw new NotFoundException(`Coffee Not Found`)
    }

    // cant throw error when no pass flavors parameter,map function error...
    const flavors = updateCoffeeDto.flavors &&
      (
        await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)))
      )

    return this.prisma.coffee.update({
      where: {
        id
      },
      data: {
        ...updateCoffeeDto,
        flavors: {
          connect: flavors
        }
      },
      include: {
        flavors: true
      }
    })
  }

  async remove(id: number): Promise<CoffeeEntity> {
    return this.prisma.coffee.delete({
      where: {
        id
      }
    })
  }

  // check if exist flavor,if not, create a flavor entity
  private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.prisma.flavor.findFirst({
      where: {
        name
      },
      select: {
        id: true
      }
    })
    if (existingFlavor) {
      return existingFlavor
    }
    return this.prisma.flavor.create({
      data: {
        name
      },
      select: {
        id: true
      }
    })
  }
}
