import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, PrismaService]
})
export class CoffeesModule { }
