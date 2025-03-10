import { Response } from 'express';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { user, access_token } = await this.auth.signUp(
      dto.email,
      dto.password,
      dto.name
    );

    response.cookie('access_token', access_token, {
      // domain: '',
      maxAge: 3600 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(
    @Req() request: { user: IUser },
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token } = this.auth.signIn(request.user);

    response.cookie('access_token', access_token, {
      // domain: '',
      maxAge: 3600 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return request.user;
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {};
  }
}
