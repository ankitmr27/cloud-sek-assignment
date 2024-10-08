import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'nice post' })
  @IsNotEmpty()
  @IsString()
  commentContent: string;
}
