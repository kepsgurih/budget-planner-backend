import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BudgetGateway } from './budget.websocket';
@Module({
  imports: [PrismaModule],
  controllers: [BudgetsController],
  providers: [BudgetsService, BudgetGateway],
})
export class BudgetsModule {}
