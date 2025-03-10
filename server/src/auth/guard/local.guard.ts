import { Response, Request } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from '../dto/auth.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const body = plainToClass(SignInDto, request.body);

    const errors = await validate(body);

    if (errors.length) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        errors: errors
      });

      return false;
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
