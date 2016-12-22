var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes){
    return sequelize.define('user',{
        localemail: DataTypes.STRING,
        localpassword: DataTypes.STRING
    }, 
    {
        classMethods: {
            generatehash: function(password){
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
        },
        instanceMethods: {
            validPassword: function(password){
                console.log(password)
                return bcrypt.compareSync(password, this.localpassword)
            },
        }
    });                                 
}
