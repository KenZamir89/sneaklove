const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");

router.get("/products_manage", (req, res) =>{
    res.render("products_manage")
});

// router.get("/products_add", (req, res, next) => {
//     sneakerModel
//         .find()
//         .then((category) =>
//             res.render("products_add", {
//                 category,
//                 title: "Créer un produit",
//             })
//         )
//         .catch(next);
// });

router.get("/products_add", (req, res) => {
    sneakerModel 
       .find()
       .then((dbRes) => {
         console.log( dbRes);
         res.render("products_add", { sneaker : dbRes }); 
       })
       .catch((dbErr) => console.log(dbErr));
   });


router.post("/products_add", (req, res) => {
    sneakerModel
      .create(req.body)
      .then((dbRes) => {
        console.log(dbRes);
        res.redirect("/products_manage");
      })
      .catch((dbErr) => console.error(dbErr));
  });


module.exports = router;
