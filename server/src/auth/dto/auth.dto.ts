import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class SignUpDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsString()
  password: string;

  @Matches(/^[A-Za-z\s\-']+$/, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
  })
  @MaxLength(30, { message: 'Name cannot be longer than 30 characters' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;
}

export class SignInDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
