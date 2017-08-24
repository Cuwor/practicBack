'use strict'
var bcrypt = require('bcrypt')
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    setterMethods: {
      password: async function(value) {
        var hash = await bcrypt.hash(value)
        this.setDataValue('encryptedPassword', hash)
      }
    },

    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Post)
      }
    }
  })
  User.prototype.comparePassword = async function(password) {
    var result = await bcrypt.compare(password, this.encryptedPassword)
    return result
  }
  return User
}
