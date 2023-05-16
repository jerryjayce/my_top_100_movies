import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsNumber,
    Min,
    Max,
} from 'class-validator';

export class RankMovieDto {
    @IsNotEmpty()
    @IsNumberString()
    movie_id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    user_id: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    rating: number;
}
