import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    user_name: number;

    @IsNotEmpty()
    @IsString()
    password: string;
}
