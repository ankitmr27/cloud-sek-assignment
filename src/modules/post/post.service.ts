import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../Entity/Post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/Entity/User.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(post: CreatePostDto, userId: string): Promise<Post> {
    // fetch user information
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const newPost = this.postRepository.create({
      title: post.title,
      content: post.content,
    });
    newPost.user = user;
    return await this.postRepository.save(newPost);
  }

  async findOne(postId: string): Promise<Post> {
    return await this.postRepository.findOne({ where: { postId } });
  }

  async delete(postId: string): Promise<void> {
    await this.postRepository.delete({ postId });
  }
}
