import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Query,
    Delete,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { RemoveMoviesDto } from './dto/remove-movies.dto';
import { RankMovieDto } from './dto/rank-movie.dto';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import * as process from 'process';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly MoviesService: MoviesService,
        private readonly httpService: HttpService,
    ) {}

    @UseGuards(AuthGuard)
    @Post('add_to_list')
    async add_to_list(
        @Body() body: CreateMoviesDto,
        @Res() response: Response,
        @Req() req,
    ) {
        try {
            body.user_id = req?.user?.user_id;
            const data = await this.MoviesService.add_to_list(body);

            response.status(data?.http_status || 201).send(data);
        } catch (err) {
            console.log('error', err);
            response.status(500).send(err);
        }
    }

    @UseGuards(AuthGuard)
    @Delete('remove_from_list')
    async remove_from_list(
        @Body() body: RemoveMoviesDto,
        @Res() response: Response,
        @Req() req,
    ) {
        try {
            body.user_id = req?.user?.user_id;
            const data = await this.MoviesService.remove_from_list(body);

            response.status(data?.http_status || 200).send(data);
        } catch (err) {
            console.log('error', err);
            response.status(500).send(err);
        }
    }

    @Get('browse')
    async browse(@Res() response: Response, @Query('page') page: string) {
        try {
            const page_num = page || 1;

            const data = await this.httpService.axiosRef.get(
                `https://api.themoviedb.org/3/movie/popular?page=${page_num}`,
                {
                    headers: {
                        Authorization: process.env.THE_MOVIE_API_SECRETE,
                    },
                },
            );

            response.status(data.status).send(data?.data || {});
        } catch (err) {
            console.log('error', err);
            response.status(500).send(err);
        }
    }

    @UseGuards(AuthGuard)
    @Get('my_movie_list')
    async my_movie_list(@Res() response: Response, @Req() req) {
        try {
            const user_id: number = req?.user?.user_id;
            const data = await this.MoviesService.get_movie_list(user_id);

            response.status(data?.http_status || 200).send(data);
        } catch (err) {
            console.log('error', err);
            response.status(500).send(err);
        }
    }

    @UseGuards(AuthGuard)
    @Put('rank_movie')
    async rank_movie(
        @Body() body: RankMovieDto,
        @Res() response: Response,
        @Req() req,
    ) {
        try {
            body.user_id = req?.user?.user_id;
            const user_id = 23;
            const data = await this.MoviesService.rank_movie(body, user_id);
            response.status(data?.http_status || 200).send(data);
        } catch (err) {
            console.log('error', err);
            response.status(500).send(err);
        }
    }
}
