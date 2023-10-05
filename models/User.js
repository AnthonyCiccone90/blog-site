const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to check if an entered password matches the hashed password in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // Define model fields based on acceptance criteria
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum password length
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Hash the user's password before creating or updating the user
User.addHook('beforeCreate', async (userData) => {
  userData.password = await bcrypt.hash(userData.password, 10);
});

User.addHook('beforeUpdate', async (userData) => {
  if (userData.changed('password')) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
});

module.exports = User;
