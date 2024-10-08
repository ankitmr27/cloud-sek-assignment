import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Comment } from './Comment.entity'; // Assuming Comment is in the same directory
import { User } from './User.entity';

@Entity('Post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  // Many posts can belong to one user (the user who posted)
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
