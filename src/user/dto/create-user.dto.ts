import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'bober@gmail.com', description: 'email' })
  @IsString({ message: 'Email is string' })
  @IsEmail({}, { message: 'Invalid Email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @IsString({ message: 'Email is string' })
  @Length(4, 16, { message: 'Password must be 4-16 symbols' })
  readonly password: string;
}
