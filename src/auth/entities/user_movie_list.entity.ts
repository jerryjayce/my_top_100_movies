import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class user_movie_list extends Model {
    @Column
    title: string;

    @Column
    movie_id: number;

    @Column
    user_id: number;

    @Column({ defaultValue: 0 })
    rating?: number;
}
