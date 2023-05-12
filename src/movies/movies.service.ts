
import { Injectable } from '@nestjs/common';
import { CreateMoviesDto } from './dto/create-movies.dto';

@Injectable()
export class MoviesService {
  create(createMoviesDto: CreateMoviesDto) {

  }
}
