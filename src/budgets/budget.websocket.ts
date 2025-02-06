import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UseGuards } from '@nestjs/common';
import { JwtWSGuard } from 'src/guard/jwt-gql-auth.guard';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway({
  cors: {
    origin: '*', // Sesuaikan dengan domain frontend
  },
})
export class BudgetGateway {
  @WebSocketServer()
  server: Server;

  constructor(private budgetsService: BudgetsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getBudgets')
  async handleGetBudgets(@ConnectedSocket() client: Socket) {
    const budgets = await this.budgetsService.findAll();
    return client.emit('getBudgets', budgets);
  }

  @UseGuards(JwtWSGuard)
  @SubscribeMessage('createBudget')
  async handleCreateBudget(
    @MessageBody() budgetData: CreateBudgetDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('loading', { type: 'create', status: true }); // Menandakan sedang proses
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const data = { ...budgetData, userId: client.data.user.id };
      const budget = await this.budgetsService.create(data);
      this.server.emit('budgetCreated', budget); // Broadcast ke semua client
      const updatedBudgets = await this.budgetsService.findAll(); // Update daftar budget
      this.server.emit('getBudgets', updatedBudgets); // Kirim data terbaru ke semua klien
      this.server.emit('loading', { type: 'create', status: false }); // Menandakan proses selesai
    } catch (error) {
      this.server.emit('loading', { type: 'create', status: false });
      console.error('Error creating budget:', error);
    }
  }

  @SubscribeMessage('updateBudget')
  async handleUpdateBudget(
    @MessageBody() budgetData: { id: number; data: UpdateBudgetDto },
  ) {
    this.server.emit('loading', { type: 'update', status: true }); // Menandakan sedang proses
    try {
      const updatedBudget = await this.budgetsService.update(
        budgetData.id,
        budgetData.data,
      );
      this.server.emit('budgetUpdated', updatedBudget); // Broadcast ke semua client
      const updatedBudgets = await this.budgetsService.findAll(); // Update daftar budget
      this.server.emit('getBudgets', updatedBudgets); // Kirim data terbaru ke semua klien
      this.server.emit('loading', { type: 'update', status: false }); // Menandakan proses selesai
    } catch (error) {
      this.server.emit('loading', { type: 'update', status: false });
      console.error('Error updating budget:', error);
    }
  }

  @SubscribeMessage('deleteBudget')
  async handleDeleteBudget(@MessageBody() budgetId: number) {
    this.server.emit('loading', { type: 'delete', status: true }); // Menandakan sedang proses
    try {
      await this.budgetsService.remove(budgetId); // Hapus budget dari database
      const updatedBudgets = await this.budgetsService.findAll(); // Ambil data setelah penghapusan
      this.server.emit('getBudgets', updatedBudgets); // Kirim data terbaru ke semua klien
      this.server.emit('loading', { type: 'delete', status: false }); // Menandakan proses selesai
    } catch (error) {
      this.server.emit('loading', { type: 'delete', status: false });
      console.error('Error deleting budget:', error);
    }
  }
}
