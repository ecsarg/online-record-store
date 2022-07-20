const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Record extends Model {}

Record.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        band_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        // Genre stands for the category
        genre_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'genre',
                key: id
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 12,
            validate: {
                isNumeric: true
            }
        },
        imgage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'record'
    }
);

module.exports = Record;