import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';

import { Request } from 'express';

// Extend the Request interface
declare module 'express' {
  interface Request {
    user?: { userId: string; createdAt: Date }; // You can define the type of the user object as per your requirement
  }
}

@Controller({
  path: 'Post',
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  // create a new post
  @UseGuards(new AuthGuard())
  @Post('/')
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    try {
      const userId = req.user.userId;
      return await this.postService.create(createPostDto, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(new AuthGuard())
  @Get('/:postId')
  async findOne(@Param('postId') postId: string) {
    try {
      return await this.postService.findOne(postId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(new AuthGuard())
  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string) {
    try {
      return await this.postService.delete(postId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Patch('/:postId')
  // async updatePost(
  //   @Param('postId') postId: string,
  //   @Body() updatePostDto: UpdatePostDto,
  // ) {}
}
