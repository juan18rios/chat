const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

//const url = "localhost:1111/test"; //conexion mongo
const url = "mongodb+srv://juansebastianrios:LoiRBI2z6660v8bk@cluster0.3d3gkx6.mongodb.net/?retryWrites=true&w=majority"; //conexion mongo

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;

