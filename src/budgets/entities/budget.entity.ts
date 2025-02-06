import { ApiProperty } from '@nestjs/swagger';
import { Budget } from '@prisma/client';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class BudgetEntity implements Budget {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  categories: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty({ required: false, nullable: true })
  userId: number | null;

  @ApiProperty({ required: false, nullable: true })
  catId: number | null;

  @ApiProperty({ required: false, type: CategoryEntity })
  Categories?: CategoryEntity;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  @ApiProperty()
  date: Date;

  constructor({ user, ...data }: Partial<BudgetEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
