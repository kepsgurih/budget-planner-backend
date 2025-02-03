import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BudgetEntity } from './entities/budget.entity';

@Controller('budgets')
@ApiTags('budget')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) { }

  @Post()
  @ApiCreatedResponse({ type: BudgetEntity })
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    return new BudgetEntity(
      await this.budgetsService.create(createBudgetDto)
    );
  }

  @Get()
  @ApiOkResponse({ type: BudgetEntity })
  async findAll() {
    const budget = await this.budgetsService.findAll();
    return budget.map((bdg) => new BudgetEntity(bdg))
  }

  @Get(':id')
  @ApiOkResponse({ type: BudgetEntity })
  async findOne(@Param('id') id: ParseIntPipe) {
    const budget = await this.budgetsService.findOne(+id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  @Put(':id')
  @ApiCreatedResponse({ type: BudgetEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return new BudgetEntity(
      await this.budgetsService.update(id, updateBudgetDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: BudgetEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new BudgetEntity(await this.budgetsService.remove(id));
  }
}
