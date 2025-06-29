const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db")

class Hotel extends Model {}

Hotel.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "hotel_name":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "address":{
        type: DataTypes.STRING,
        allowNull: false,
    },
    "start_date": {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    "end_date": {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    "price":{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    "nbr_night": {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    "image_url": {
    type: DataTypes.STRING,
    allowNull: true,
    },
}, { sequelize })

module.exports = Hotel;