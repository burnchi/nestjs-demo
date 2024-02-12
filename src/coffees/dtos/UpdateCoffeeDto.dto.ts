import { PartialType } from "@nestjs/swagger";
import { CreateCoffeeDto } from "./CreateCoffeeDto.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) { }
