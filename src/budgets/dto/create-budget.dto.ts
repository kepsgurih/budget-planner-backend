import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  catId: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(2)
  // @ApiProperty()
  // catId: string;
}
