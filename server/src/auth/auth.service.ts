import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    private users: UsersService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.getUser(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { id: user.id, email: user.email, name: user.name };
      }
    }

    return null;
  }

  signIn(user: { id: string }) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwt.sign(payload, {
        secret: this.config.get('JWT_SECRET')
      })
    };
  }
}
