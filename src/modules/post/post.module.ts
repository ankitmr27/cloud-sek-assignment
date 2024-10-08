import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/Entity/Post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { User } from 'src/Entity/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
