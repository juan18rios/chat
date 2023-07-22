"use strict";

const connectdb = require("../mongoDB/dbconnection");
const chat = require("../mongoDB/chatSchema");

exports.obtener = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    connectdb.then(db => {
        chat.find({}).then(chat =>{
            res.json(chat);
        });
    });
});
