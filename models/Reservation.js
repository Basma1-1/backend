const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Reservation extends Model {}

Reservation.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "reservation_date":{ 
        type: DataTypes.DATE,
        allowNull: false,
    },
    "price":{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    "reservation_status":{
        type: DataTypes.ENUM('en cours', 'valide', 'echoue'),
        allowNull: false,
    },

}, { sequelize })

module.exports = Reservation;