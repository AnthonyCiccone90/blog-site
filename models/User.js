const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator_username: {
            type: DataTypes.STRING,
            allowNull: false,
         },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
