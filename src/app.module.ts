import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './movies/entities/user.entity';
import { user_movie_list } from './movies/entities/user_movie_list.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development', '.env'],
            load: [configuration],
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DB_UN,
            password: process.env.DB_P,
            database: process.env.DB_UN,
            models: [User, user_movie_list],
            autoLoadModels: true,
            synchronize: true,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
        MoviesModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
