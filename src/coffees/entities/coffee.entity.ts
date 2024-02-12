
import { ApiProperty } from "@nestjs/swagger";
import { Coffee } from "@prisma/client";
import { FlavorEntity } from "./flavor.entity";

export class CoffeeEntity implements Coffee {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  flavors?: FlavorEntity[]
}
