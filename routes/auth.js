const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/User");

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", (req, res, next) => {//connection
    const connectUser = req.body
    if (!connectUser === connectUser.email || !connectUser === connectUser.password) //verification
    {
        req.flash("Try Again by Aaliyah");
        res.redirect("/signin")
    };
    userModel
        .findOne({
            email: connectUser.email //on recherche user dans la bd par son email
        })
        .then((user) => {
            if (!user) {
                req.flash("Incorrect")
                res.redirect("/signin")
            }
            const password = bcrypt.compareSync(connectUser.password, user.password);
            if (password === false) {
                req.flash("Incorrect")
                res.redirect("/signin")
            }
        })
        .catch(next)
})

router.post("/signup", (req, res, next) => {//inscription
    const inscriptionUser = req.body;
    if (!inscriptionUser.name || !inscriptionUser.lastname || !inscriptionUser.email || !inscriptionUser.password) {
        req.flash("Try again");
        res.redirect("/signup");
    } else {
        userModel
            .findOne({
                email: inscriptionUser.email
            })
            .then((dbRes) => {
                if (dbRes) {
                    req.flash("Email non disponible")
                    res.redirect("/signup")
                }

            })
            .catch(next)
        const salt = bcrypt.genSaltSync(10);//pour crypter le mdp
        const hashed = bcrypt.hashSync(inscriptionUser.password, salt);
        console.log(hashed);
        inscriptionUser.password = hashed;


        userModel
            .create(inscriptionUser)
            .then((dbRes) => {
                req.flash("Bravo !");
                res.redirect("/signin");
            })
            .catch(next);
    }

});

module.exports = router;