import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { user_movie_list } from './entities/user_movie_list.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [SequelizeModule.forFeature([User, user_movie_list]), HttpModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
