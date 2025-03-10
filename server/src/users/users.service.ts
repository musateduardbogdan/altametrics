import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(email: string, password: string, name: string) {
    return await this.prisma.user.create({ data: { email, password, name } });
  }
}
