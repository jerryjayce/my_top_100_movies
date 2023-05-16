import {
    IsNotEmpty,
    IsNumberString,
    Length,
    IsOptional,
    IsNumber,
    Min,
    Max,
} from 'class-validator';

export class RemoveMoviesDto {
    @IsNotEmpty()
    @IsNumberString()
    movie_id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    user_id: string;
}
