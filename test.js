var pg = require('pg');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var con = 'postgres://postgres:123456@localhost:5432/USER';
var sequelize = new Sequelize(con);


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
  