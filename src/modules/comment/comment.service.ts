import { InjectRepository } from '@nestjs/typeorm';
import * as sanitizeHtml from 'sanitize-html';
import { Repository } from 'typeorm';
import { Post } from '../../Entity/Post.entity';
import { Injectable } from '@nestjs/common';
import { Comment } from 'src/Entity/Comment.entity';
import { User } from 'src/Entity/User.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  // Save a new comment with sanitized rich text content
  async createComment(
    postId: string,
    rawContent: string,
    userId: string,
  ): Promise<Comment> {
    const sanitizedContent = sanitizeHtml(rawContent, {
      allowedTags: ['b', 'i', 'a', 'ul', 'li', 'strong', 'em'],
      allowedAttributes: {
        a: ['href'],
      },
    });

    const comment = new Comment();
    comment.content = sanitizedContent;
    comment.post = await this.postRepository.findOne({
      where: { postId },
    });

    if (!comment.post) {
      throw new Error('Post not found');
    }

    comment.user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!comment.user) {
      throw new Error('User not found');
    }

    return await this.commentRepository.save(comment);
  }

  // Find all comments associated with a given post
  async findAllCommentsByPostId(postId: string): Promise<Comment[]> {
    const post = await this.postRepository.findOne({ where: { postId } });
    return await this.commentRepository.find({
      where: { post: post },
    });
  }

  // Delete a comment by its ID
  async deleteComment(postId: string, commentId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { commentId },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.post.postId !== postId) {
      throw new Error('Comment does not belong to the specified post');
    }

    await this.commentRepository.delete(comment);
  }
}
