// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render("movies/new-movie.hbs", {allCelebrities})
    })
    .catch((err) => {
        next(err)
    })
})

router.post("/create", (req, res, next) => {
    MovieModel.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast

    })
    .then((createCelebrity) => {
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })
})








module.exports = router;