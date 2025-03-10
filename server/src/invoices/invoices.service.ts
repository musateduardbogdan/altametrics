import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async getInvoices(userId: string) {
    return await this.prisma.invoice.findMany({
      where: { user_id: userId },
      orderBy: { description: 'asc' }
    });
  }

  async getInvoice(id: string, userId: string) {
    return await this.prisma.invoice.findUnique({
      where: { id, user_id: userId }
    });
  }
}
