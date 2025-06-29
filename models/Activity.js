const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db")

class Activity extends Model {}

Activity.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "activity_name":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "activity_time":{
        type: DataTypes.TIME,
        allowNull: false,
    },
    "date": {
        type: DataTypes.DATE,
        allowNull: true
    },
    "duration":{
        type: DataTypes.STRING,
        allowNull: false,
    },
    "price":{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    "image_url": {
    type: DataTypes.STRING,
    allowNull: true,
    },
}, { sequelize })

module.exports = Activity;