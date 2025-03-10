import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Req() request: { user: { sub: string } }) {
    const user = await this.users.getUserById(request.user.sub);

    if (!user) {
      return null;
    }

    return { id: user.id, email: user.email, name: user.name };
  }
}
