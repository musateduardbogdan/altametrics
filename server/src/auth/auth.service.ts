import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    private users: UsersService
  ) {}

  async validateCredentials(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.users.getUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { id: user.id, email: user.email, name: user.name };
      }
    }

    return null;
  }

  async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<{ user: IUser; access_token: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.users.createUser(email, hashedPassword, name);
    const payload = { sub: user.id };

    return {
      user: { id: user.id, email: user.email, name: user.name },
      access_token: this.jwt.sign(payload, {
        secret: this.config.get('JWT_SECRET')
      })
    };
  }

  signIn(user: { id: string }): { access_token: string } {
    const payload = { sub: user.id };

    return {
      access_token: this.jwt.sign(payload, {
        secret: this.config.get('JWT_SECRET')
      })
    };
  }
}
