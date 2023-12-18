'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feedback.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });

    }
  }
  Feedback.init({
    userId: DataTypes.STRING,
    postId: DataTypes.STRING,
    titlePost: DataTypes.STRING,
    content: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};