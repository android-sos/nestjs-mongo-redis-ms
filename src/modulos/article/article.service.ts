import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto';

import {ArticleRO, ArticlesRO, CommentsRO} from './article.interface';
const slug = require('slug');

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query): Promise<ArticlesRO> {

    const qb = await getRepository(ArticleEntity)
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author');

    qb.where("1 = 1");

    qb.orderBy('article.created', 'DESC');

    const articlesCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const articles = await qb.getMany();

    return {articles, articlesCount};
  }
  
  async findOne(where): Promise<ArticleRO> {
    const article = await this.articleRepository.findOne(where);
    return {article};
  }

  async create(userId: number, articleData: CreateArticleDto): Promise<ArticleEntity> {

    let article = new ArticleEntity();
    article.title = articleData.title;
    article.description = articleData.description;
    article.slug = this.slugify(articleData.title);
    article.tagList = articleData.tagList || [];


    const newArticle = await this.articleRepository.save(article);

    const author = await this.userRepository.findOne({ where: { id: userId } });

    if (Array.isArray(author.articles)) {
      author.articles.push(article);
    } else {
      author.articles = [article];
    }

    await this.userRepository.save(author);

    return newArticle;

  }

  async update(slug: string, articleData: any): Promise<ArticleRO> {
    let toUpdate = await this.articleRepository.findOne({ slug: slug});
    let updated = Object.assign(toUpdate, articleData);
    const article = await this.articleRepository.save(updated);
    return {article};
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.articleRepository.delete({ slug: slug});
  }

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }
}
