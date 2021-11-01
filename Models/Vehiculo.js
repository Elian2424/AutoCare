const Sequelize = require("sequelize");

const sequelize = require("../Util/database");


const Vehicule = sequelize.define(
    "Vehicule",
    {
        Id:{
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        Marca:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Modelo:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Año:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        Precio:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        Image1:{
            type: Sequelize.STRING,
            allowNull: true,
        }

    }
);

module.exports = Vehicule;