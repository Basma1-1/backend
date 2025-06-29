const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db")

class Transport extends Model {}

Transport.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "transport_type":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "company":{
        type: DataTypes.STRING,
        allowNull: false,
    },
     "depart_point":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "arrival_point":{
        type: DataTypes.STRING,
        allowNull: false,
    },
    "departure_date":{
        type: DataTypes.DATE,
        allowNull: true,
    },
    "departure_time":{
        type: DataTypes.TIME,
        allowNull: false,
    },
    "duration": {
        type: DataTypes.STRING,
        allowNull: true,
    },
    "price":{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    "return_date": {
        type: DataTypes.DATE,
        allowNull: true,
    },
    "return_time":{
        type: DataTypes.TIME,
        allowNull: false,
    },
    "image_url": {
    type: DataTypes.STRING,
    allowNull: true,
    },
}, { sequelize })

module.exports = Transport;