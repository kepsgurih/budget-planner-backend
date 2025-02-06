import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostBudgetInput {
  @Field()
  description: string;
  @Field(() => Int)
  amount: number;
  @Field(() => Int)
  catId: number;
  @Field(() => Int)
  userId: number;
  @Field()
  type: boolean;
}
