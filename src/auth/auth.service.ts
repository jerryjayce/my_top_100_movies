import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as process from 'process';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    async login(loginDto: LoginDto) {
        try {
            const response: {
                data: object;
                message: string;
                error: boolean;
                http_status: number;
            } = {
                error: false,
                message: '',
                data: {},
                http_status: 200,
            };

            const user: any = await User.findOne({
                raw: true,
                where: {
                    email: loginDto.user_name,
                },
            });

            const saltOrRounds = 10;
            const password = loginDto.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            const is_match = await bcrypt.compare(password, user?.password);

            if (!is_match || !user) {
                response.error = true;
                response.http_status = 401;
                response.message = 'Invalid login details';
                return response;
            }

            const payload = { email: user.email, user_id: user.id };

            console.log(process.env.JWT_SECRET);

            response.message = 'login successful';
            response.data = {
                access_token: await this.jwtService.signAsync(payload),
            };
            return response;
        } catch (e) {
            console.log('login error', e);
        }
    }

    async register(loginDto: LoginDto) {
        try {
            const response: {
                data: object;
                message: string;
                error: boolean;
                http_status: number;
            } = {
                error: false,
                message: '',
                data: {},
                http_status: 201,
            };

            // const user: any = await User.findOne({
            //     where: {
            //         email: loginDto.user_name,
            //     },
            // });

            const saltOrRounds = 10;
            const password = loginDto.password;
            const hash = await bcrypt.hash(password, saltOrRounds);

            response.message = 'music added to list successfully';
            response.data = { password: hash };
            return response;
        } catch (e) {
            console.log('error adding movie to list', e);
        }
    }
}
