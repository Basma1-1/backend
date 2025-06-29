const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db")

class Paiement extends Model {}

Paiement.init({
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "method":{ 
        type: DataTypes.STRING,
        allowNull: false,
    },
    "amount":{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    "paiement_status":{
        type: DataTypes.ENUM('en cours', 'valide', 'echoue'),
        allowNull: false,
    },  
}, { sequelize })

module.exports = Paiement;