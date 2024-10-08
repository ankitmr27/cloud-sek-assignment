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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller({
  path: 'comment',
  version: '1',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(new AuthGuard())
  @Post(':postId')
  async createComment(
    @Req() req: Request,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      const userId = req.user.userId;
      return await this.commentService.createComment(
        postId,
        createCommentDto.commentContent,
        userId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(new AuthGuard())
  @Get(':postId')
  async findAllCommentsByPostId(@Param('postId') postId: string) {
    try {
      return await this.commentService.findAllCommentsByPostId(postId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(new AuthGuard())
  @Delete(':postId/:commentId')
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    try {
      await this.commentService.deleteComment(postId, commentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Request } from 'express';

// Extend the Request interface
declare module 'express' {
  interface Request {
    user?: { userId: string; createdAt: Date }; // You can define the type of the user object as per your requirement
  }
}
