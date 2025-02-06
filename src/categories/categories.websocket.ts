import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtWSGuard } from 'src/guard/jwt-gql-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
export class CategoriesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private kategori: CategoriesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getCat')
  async handleGetAll(@ConnectedSocket() client: Socket) {
    const cat = await this.kategori.findAll();
    return client.emit('getCat', cat);
  }

  @UseGuards(JwtWSGuard)
  @SubscribeMessage('createCategories')
  async handleCreateBudget(@MessageBody() catData: CreateCategoryDto) {
    this.server.emit('loading', { type: 'create', status: true });
    try {
      const budget = await this.kategori.create(catData);
      this.server.emit('categoryCreated', budget); // Broadcast ke semua client
      const updatedBudgets = await this.kategori.findAll(); // Update daftar budget
      this.server.emit('getCat', updatedBudgets); // Kirim data terbaru ke semua klien
      this.server.emit('loading', { type: 'create', status: false }); // Menandakan proses selesai
    } catch (error) {
      this.server.emit('loading', { type: 'create', status: false });
      console.error('Error creating budget:', error);
    }
  }

  @UseGuards(JwtWSGuard)
  @SubscribeMessage('updateCategories')
  async handleUpdateBudget(
    @MessageBody() budgetData: { id: number; data: UpdateCategoryDto },
  ) {
    this.server.emit('loading', { type: 'update', status: true });
    try {
      const budget = await this.kategori.update(budgetData.id, budgetData.data);
      this.server.emit('categoryUpdated', budget); // Broadcast ke semua client
      const updatedBudgets = await this.kategori.findAll(); // Update daftar budget
      this.server.emit('getCat', updatedBudgets); // Kirim data terbaru ke semua klien
      this.server.emit('loading', { type: 'update', status: false });
    } catch (error) {
      this.server.emit('loading', { type: 'update', status: false });
      console.error('Error updating budget:', error);
    }
  }

  @SubscribeMessage('deleteCategories')
  async handleDeleteBudget(@MessageBody() catId: number) {
    this.server.emit('loading', { type: 'delete', status: true }); // Menandakan sedang proses
    try {
      await this.kategori.remove(catId); // Hapus budget dari database
      const updatedBudgets = await this.kategori.findAll(); // Ambil data setelah penghapusan
      this.server.emit('getCat', updatedBudgets); // Kirim data terbaru ke semua klien
      this.server.emit('loading', { type: 'delete', status: false }); // Menandakan proses selesai
    } catch (error) {
      this.server.emit('loading', { type: 'delete', status: false });
      console.error('Error deleting budget:', error);
    }
  }
}
