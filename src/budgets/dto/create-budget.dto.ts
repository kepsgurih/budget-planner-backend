import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  description: string;

  @IsBoolean()
  @ApiProperty({ required: true, default: true })
  type: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  categories: string;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}
