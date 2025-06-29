const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db")

class Notification extends Model {}

Notification.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "date":{ 
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    "message": {
    type: DataTypes.STRING,
    allowNull: false,
    },
    "documentUrl": {
    type: DataTypes.STRING,
    allowNull: true
    },
    
}, { sequelize ,
    timestamps: true,
})


module.exports = Notification;