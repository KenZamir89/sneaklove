const express = require("express");
const router = new express.Router();
const sneakerModel = require("./../models/Sneaker");

router.get("/products", (req, res, next)=>{
    sneakerModel
    .find()
    .populate("products")
    .then((dbRes)=>{
        res.render("products"),{
            sneaker:dbRes
        }
    })
    .catch(next)
})

module.exports = router;