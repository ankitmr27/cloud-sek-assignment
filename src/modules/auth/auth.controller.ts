import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { jwtService } from '../jwt /jwt.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: jwtService,
  ) {}

  @Post('/signup')
  async signup(@Body() userSignUpDto: UserSignUpDto) {
    try {
      console.log(userSignUpDto);
      return this.authService.signup(userSignUpDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/login')
  async login(@Body() userSignInDto: UserSignInDto) {
    try {
      console.log(userSignInDto);
      const user = await this.authService.validateUser(userSignInDto);
      delete user.password;
      const token = await this.jwtService.getToken(user);
      return {
        ...user,
        token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
