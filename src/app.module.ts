import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { ArticleModule } from './modulos/article/article.module';
import { UserModule } from './modulos/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticleModule,
    UserModule,
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
