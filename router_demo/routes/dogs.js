const express = require('express');
const routes = express.Router();

routes.get("/", (req, res) => {
    res.send("Dog page!")
})

routes.post("/", (req, res) => {
    res.send("dooging !")
})

routes.get("/:id", (req, res) => {
    res.send("view one dog info!")
})

routes.get("/:id/edit", (req, res) => {
    res.send("editing 1 dog info!")
})    

module.exports = routes;