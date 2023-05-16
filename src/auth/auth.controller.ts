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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService,
        private readonly httpService: HttpService,
    ) {}

    @Post('login')
    async login(@Body() body: LoginDto, @Res() response: Response) {
        try {
            const data = await this.AuthService.login(body);

            response.status(data?.http_status || 401).send(data);
        } catch (err) {
            console.log('error', err);
            response.status(500).send(err);
        }
    }
}
