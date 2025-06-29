const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class User extends Model {}

User.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "name":{ 
        type: DataTypes.STRING,
        allowNull: false, 
    },
    "password":{
        type: DataTypes.STRING,
        allowNull: false,
    },
    "email":{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },

}, { sequelize })

module.exports = User;