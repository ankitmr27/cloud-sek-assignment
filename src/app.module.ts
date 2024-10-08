import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareUser } from './middleware/extractUserInfo.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtModule } from './modules/jwt /jwt.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { User } from './Entity/User.entity';

@Module({
  imports: [
    AuthModule,
    jwtModule,
    PostModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: false, // Be cautious with this in production set false
      // update db schema according to current entity schemas
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false, // TODO : we need to add ssl certifcation
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, MiddlewareUser],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareUser).forRoutes('/');
  }
}
