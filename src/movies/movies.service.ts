import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMoviesDto } from "./dto/create-movies.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class MoviesService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {
  }

  create(createMoviesDto: CreateMoviesDto) {
    return this.userModel.findAll();
    // return createMoviesDto;
  }
}
