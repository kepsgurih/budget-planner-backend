import { ApiProperty } from '@nestjs/swagger';
import { Budget } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { UserEntity } from 'src/users/entities/user.entity';

export class BudgetEntity implements Budget {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  categories: string;

  @ApiProperty()
  amount: Decimal;

  @ApiProperty()
  type: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty({ required: false, nullable: true })
  userId: number | null;


  @ApiProperty({ required: false, type: UserEntity })

  user?: UserEntity;

  constructor({ user, ...data }: Partial<BudgetEntity>) {

    Object.assign(this, data);

    if (user) {

      this.user = new UserEntity(user);

    }

  }
}
