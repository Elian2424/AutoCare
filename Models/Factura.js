const Sequelize = require("sequelize");

const sequelize = require("../Util/database");


const Factura = sequelize.define(
    "Factura",
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
        Direccion:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Correo:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        Tell:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Empleado:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Servicio:{
            type: Sequelize.STRING,
            allowNull: false
        },
        
        Monto:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Make:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Model:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Year:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        Color:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Vin:{
            type: Sequelize.STRING,
            allowNull: true,

        },
        OdoMeter:{
            type: Sequelize.STRING,
            allowNull: true,

        },
        Fecha:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        TotalParts:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        TotalLabor:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Deposit:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Balance:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        TotalDue:{
            type: Sequelize.INTEGER,
            allowNull: false
        }

    }
);

module.exports = Factura;