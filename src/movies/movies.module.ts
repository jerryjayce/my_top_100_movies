import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { user_movie_list } from './entities/user_movie_list.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [SequelizeModule.forFeature([User, user_movie_list]), HttpModule],
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule {}
