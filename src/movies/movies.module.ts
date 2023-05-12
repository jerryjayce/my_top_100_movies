import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Module({
  providers: [MoviesService],
})
export class MoviesModule {}
