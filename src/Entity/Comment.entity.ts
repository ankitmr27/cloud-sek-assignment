import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';
import { Post } from './Post.entity'; // Assuming Post is in the same directory

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true }) // Correctly reference comments
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
