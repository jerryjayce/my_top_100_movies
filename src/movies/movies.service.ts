import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { RemoveMoviesDto } from './dto/remove-movies.dto';
import { User } from './entities/user.entity';
import { user_movie_list } from './entities/user_movie_list.entity';
import { RankMovieDto } from "./dto/rank-movie.dto";

@Injectable()
export class MoviesService {
    async add_to_list(createMoviesDto: CreateMoviesDto) {
        try {
            const response: {data: object; message: string; error: boolean, http_status: number } =
                {
                    error: false,
                    message: '',
                    data: {},
                    http_status: 201,
                };

            const user_list = await user_movie_list.findOne({
                where: {
                    movie_id: createMoviesDto.movie_id,
                    user_id: createMoviesDto.user_id
                },
            });

            if (user_list) {
                response.error = true;
                response.http_status = 409;
                response.message = 'movie already exists on your list';
                return response;
            }

            const created_movie_list = await user_movie_list.create({
                title: createMoviesDto.title,
                movie_id: createMoviesDto.movie_id,
                user_id: createMoviesDto.user_id,
                rating: createMoviesDto.rating,
            });

            response.message = 'movie added to list successfully';
            response.data = created_movie_list;
            return response;
        } catch (e) {
            console.log('error adding movie to list', e);
        }
    }

    async remove_from_list(removeMoviesDto: RemoveMoviesDto) {
        try {
            const response: {data: object; message: string; error: boolean, http_status: number } =
                {
                    error: false,
                    message: '',
                    data: {},
                    http_status: 204,
                };

            const user_list = await user_movie_list.findOne({
                where: {
                    movie_id: removeMoviesDto.movie_id,
                    user_id: removeMoviesDto.user_id
                },
            });

            if (!user_list) {
                response.error = true;
                response.http_status = 404;
                response.message = 'movie is not on your list';
                return response;
            }

            await user_movie_list.destroy({
                where:{
                    movie_id: removeMoviesDto.movie_id,
                    user_id: removeMoviesDto.user_id
                }
            });

            response.message = 'movie removed from list successfully';
            return response;
        } catch (e) {
            console.log('error removing movie from list', e);
        }
    }

    async get_movie_list(user_id: number) {
        try {
            const response: {data: object; message: string; error: boolean, http_status: number } =
                {
                    error: false,
                    message: '',
                    data: {},
                    http_status: 200,
                };

            const user_list = await user_movie_list.findAll({
                where: {
                    user_id
                },
            });

            if (!user_list) {
                response.error = true;
                response.http_status = 404;
                response.message = 'your movie List is currently empty';
                return response;
            }


            response.message = 'music list retrieved successfully';
            response.data = user_list;
            return response;
        } catch (e) {
            console.log('error getting movie list', e);
        }
    }

    async rank_movie(rankMovieDto: RankMovieDto, user_id: number) {
        try {
            const response: {data: object; message: string; error: boolean, http_status: number } =
              {
                  error: false,
                  message: '',
                  data: {},
                  http_status: 200,
              };

            const user_list = await user_movie_list.findOne({
                where: {
                    movie_id: rankMovieDto.movie_id,
                    user_id
                },
            });

            if (!user_list) {
                response.error = true;
                response.http_status = 404;
                response.message = 'movie does not exist on your list';
                return response;
            }

            const updated_movie_rating = await user_movie_list.update({
                rating: rankMovieDto.rating,
            }, {
                where: {
                    movie_id: rankMovieDto.movie_id,
                    user_id
                }
            });

            response.message = 'movie rated successfully';
            return response;
        } catch (e) {
            console.log('error ranking movie', e);
        }
    }

}
