const express = require('express');
const routes = express.Router();

routes.use((req, res, next) => {
    if(req.query.isadmin){
        next();
    } else {
        res.send("You are not an admin!")
    }
})

routes.get("/", (req, res) => {
    res.send("admin created!")
})

routes.get("/topsecret", (req, res) => {
    res.send("You found the secret admin page!")
})

module.exports = routes;