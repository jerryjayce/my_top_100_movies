import { Column, Model, Table, HasMany, HasOne, BelongsToMany,  } from "sequelize-typescript";
import { user_movie_list } from './user_movie_list.entity';

@Table
export class User extends Model {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => user_movie_list, "user_id")
  User_movie_list: user_movie_list[];
}