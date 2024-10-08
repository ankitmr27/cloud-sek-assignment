import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../modules/jwt /jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MiddlewareUser implements NestMiddleware {
  constructor(
    @Inject(jwtService) private readonly jwtService: jwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(
        'Request header authorization:',
        req.headers['authorization'],
      );
      if (!req.headers['authorization']) {
        req.user = null;
      } else {
        const token = req.headers['authorization'].split(' ')[1];
        if (token) {
          req.user = await this.jwtService.validateToken(token);
          console.log(req.user);
          // check if user exists in database
          const user = await this.userRepository.findOne({
            where: { userId: req.user.userId },
          });
          if (!user) {
            req.user = null;
          }
        } else {
          req.user = null;
        }
      }
      next();
    } catch (err) {
      res.status(401).json({ message: err });
    }
  }
}
