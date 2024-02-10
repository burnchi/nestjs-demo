import { IsOptional, IsPositive, Min } from "class-validator";
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  @Min(0)
  offset?: number
}
