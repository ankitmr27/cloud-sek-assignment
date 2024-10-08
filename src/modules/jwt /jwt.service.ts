import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from 'src/Entity/User.entity';
dotenv.config();

@Injectable()
export class jwtService {
  async getToken(user: User) {
    const JWT_KEY = process.env.JWT_KEY;
    if (!JWT_KEY) {
      throw new Error('JWT_KEY not found in environment variables.');
    }
    const JWTtoken: string = jwt.sign(
      {
        payload: {
          userId: user.userId,
          createdAt: user.createdAt,
        },
      },
      JWT_KEY,
    );
    return JWTtoken;
  }

  async validateToken(token: string) {
    const JWT_KEY = process.env.JWT_KEY;
    const decoded = await jwt.verify(token, JWT_KEY);
    return decoded.payload;
  }
}
