import { Module } from '@nestjs/common';
import { jwtService } from '../modules/jwt /jwt.service';

@Module({
  imports: [],
  providers: [jwtService],
  controllers: [],
  exports: [jwtService],
})
export class jwtModule {}
