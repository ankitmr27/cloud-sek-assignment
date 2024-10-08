import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  ReTypePassword: string;
}
