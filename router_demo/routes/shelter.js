const express = require('express');
const routes = express.Router();

routes.get("/", (req, res) => {
    res.send("Welcome to the shelter page!")
})

routes.post("/", (req, res) => {
    res.send("create shelter !")
})

routes.get("/:id", (req, res) => {
    res.send("view one shelter!")
})

routes.get("/:id/edit", (req, res) => {
    res.send("editing 1 shelter!")
})      



module.exports = routes;
