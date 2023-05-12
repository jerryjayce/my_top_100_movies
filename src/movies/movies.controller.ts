import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';

@Controller('mandates')
export class MoviesController {
  constructor(private readonly mandateService: MoviesService) {}

  @Post()
  create(@Body() body: CreateMoviesDto) {
    return this.mandateService.create(body);
  }

}
