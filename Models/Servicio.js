const Sequelize = require("sequelize")
const sequelize = require("../Util/database");

const Servicio = sequelize.define(

    "Servicios",
    {
        Id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Descripcion:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        Precio:{
            type: Sequelize.INTEGER,
            allowNull: false,
        }

    }
);
module.exports = Servicio;