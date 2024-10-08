import { Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { User } from 'src/Entity/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<User> {
    // Implement logic to save user to the database
    // Validate user input
    // Hash password
    const hashedPassword = await this.hashPassword(userSignUpDto.password);

    // Return the saved user
    const user = this.userRepository.create({
      email: userSignUpDto.email,
      password: hashedPassword, // Hash password before saving
    });
    await this.userRepository.save(user);
    return user;
  }

  // to implement the validation of existing users with password
  async validateUser(user: UserSignInDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!foundUser) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return foundUser;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND)); // 10 is the salt rounds, which controls the complexity
    return bcrypt.hash(password, salt);
  }
}
