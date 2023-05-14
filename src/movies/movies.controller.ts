import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';

@Controller('movies')

export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Post('add_to_list')
  create(@Body() body: CreateMoviesDto) {
    try {
      return this.MoviesService.create(body);
    }catch (err){
      console.log("gotcha", err);
    }
  }

}

























