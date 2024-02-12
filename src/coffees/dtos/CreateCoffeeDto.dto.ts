import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCoffeeDto {

  @IsString()
  @ApiProperty({ description: 'The name of coffee' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'The brand of coffee' })
  brand: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  flavors: string[]
}
