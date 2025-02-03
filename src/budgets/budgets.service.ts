import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  create(createBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.create({ data: createBudgetDto });
  }

  findAll() {
    return this.prisma.budget.findMany();
  }

  findOne(id: number) {
    return this.prisma.budget.findUnique({ where: { id } });
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return this.prisma.budget.update({
      where: { id },
      data: updateBudgetDto,
    });
  }

  remove(id: number) {
    return this.prisma.budget.delete({ where: { id } });
  }
}
