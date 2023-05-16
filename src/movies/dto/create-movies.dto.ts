import {
    IsNotEmpty,
    IsNumberString,
    Length,
    IsOptional,
    IsNumber,
    Min,
    Max,
} from 'class-validator';

export class CreateMoviesDto {
    @IsNotEmpty()
    @Length(2, 50)
    title: string;

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
