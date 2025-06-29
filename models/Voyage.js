const {  Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db")

class Voyage extends Model {}

Voyage.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "destination":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "depart": {  
        type: DataTypes.STRING,
        allowNull: false,
    },
    "description":{
        type: DataTypes.STRING,
    },
    "start_date":{
        type: DataTypes.DATE,
        allowNull: false,
    },
    "end_date":{
        type: DataTypes.DATE,
    },
    "image_url": {
    type: DataTypes.STRING,
    allowNull: true,
    },
}, { sequelize })

module.exports = Voyage;