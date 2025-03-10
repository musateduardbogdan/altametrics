import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/unbound-method
        JwtStrategy.ExtractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') as string
    });
  }

  validate(payload: { sub: string }) {
    return payload;
  }

  private static ExtractJwtFromCookie(request: Request) {
    if (request.cookies && 'access_token' in request.cookies) {
      return request.cookies.access_token as string;
    }

    return null;
  }
}
