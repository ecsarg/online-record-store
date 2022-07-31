const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    img_url: {
        //type: DataTypes.STRING,
        type: DataTypes.BLOB,
        allowNull: false,
      },
      band_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
        }
      },
      album_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
        }
      },
      
      // Genre stands for the category
      genre: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
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
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
})


module.exports = Post;