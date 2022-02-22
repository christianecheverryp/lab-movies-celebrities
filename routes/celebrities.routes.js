// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here


router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
})

router.post("/create", (req, res, next) => {
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then((createCelebrity) => {
        res.redirect("/celebrities")
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render("celebrities/celebrities.hbs", {allCelebrities})
    })
    .catch((err) => {
        next(err)
    })
})




module.exports = router;