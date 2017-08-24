'use strict'
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    hashPassword: {
      allowNull: false,
      type: DataTypes.STRING
    },
    admin: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })
  return Users
}
