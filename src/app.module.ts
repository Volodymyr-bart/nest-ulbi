import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { User } from './user/model/user.model';
import { Role } from './roles/model/roles.model';
import { UserRoles } from './roles/model/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/model/posts.model';
import { AdditionalModule } from './additional/additional.module';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import * as path from 'path';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      // envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      dialectOptions: {
        // Додаємо параметр pass для передачі пароля
        pass: process.env.POSTGRES_PASSWORD,
      },
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    PostsModule,
    AdditionalModule,
  ],
})
export class AppModule {}
