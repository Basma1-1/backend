const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db")

class Document extends Model {}

Document.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "type":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "format":{
        type: DataTypes.STRING,
         allowNull: false,
    },
    "taille":{
        type: DataTypes.INTEGER,
         allowNull: false,
    },
}, { sequelize })

module.exports = Document;