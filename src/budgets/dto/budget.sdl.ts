import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BudgetSDL {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  catId?: number | null;

  @Field(() => Int, { nullable: true })
  userId?: number | null;

  @Field()
  type: boolean;

  @Field(() => Int)
  amount: number;

  @Field()
  description: string;

  @Field(() => Date) // Wajib ada, tidak bisa null
  createdAt: Date;

  @Field(() => Date, { nullable: true }) // Bisa null jika belum diupdate
  updateAt?: Date | null;
}

@ObjectType()
export class MutationResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
