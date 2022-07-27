const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class PostRecord extends Model {}

// create fields/columns for Post model
PostRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img_url: {
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
        allowNull: false,
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
    modelName: 'postRecord'
  }
);

module.exports = PostRecord;
