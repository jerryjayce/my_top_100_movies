'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_movie_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_movie_list.init({
    title: DataTypes.STRING,
    movie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'user_movie_list',
  });
  return user_movie_list;
};