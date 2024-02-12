import { ApiProperty } from "@nestjs/swagger";
import { CoffeeEntity } from "./coffee.entity";

export class FlavorEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name?: string;

  @ApiProperty({ required: false, type: CoffeeEntity })
  flavors?: CoffeeEntity[]
}
