const Sequelize = require("sequelize");

const sequelize = require("../Util/database");

const Admin = sequelize.define(
    "Admin",
    {
        Id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Nombre:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Apellido:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Correo:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Contraseña:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }
);

module.exports = Admin;