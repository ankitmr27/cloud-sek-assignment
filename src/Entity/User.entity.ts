import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity'; // Ensure you import Comment

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  userId: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user) // Correctly reference Comment
  comments: Comment[]; // Change to comments array

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date; // Add onUpdate for updatedAt to update the timestamp on updates
}
