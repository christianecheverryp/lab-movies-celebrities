
const router = require("express").Router();
const MovieModel = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

// RUTA PARA AÑADIR PELÍCULAS (ITERACIÓN 3):

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

// RUTA PARA VER EL LISTADO DE PELÍCULAS (ITERACIÓN 7):

router.get("/", (req, res, next) => {
    MovieModel.find()
    .then((allMovies) => {
        res.render("movies/movies.hbs", {allMovies})
    })
    .catch((err) => {
        next(err)
    })
})

// RUTA PARA VER LOS DETALLES DE CADA PELÍCULA (ITERACIÓN 8):

router.get("/:id", (req, res, next)=>{
    const {id} = req.params
    MovieModel.findById(id)
    .populate("cast")
    .then((oneMovie)=>{
        res.render("movies/movie-details.hbs", {oneMovie})
    })
    .catch((err) => {
        next(err)
    })

})

// RUTA PARA BORRAR UNA PELÍCULA (ITERACIÓN 9):

router.post("/:id/delete", (req, res, next)=>{
    const {id} = req.params
    MovieModel.findByIdAndDelete(id)
    .then((deleteMovie)=>{
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })
})

// RUTA PARA EDITAR UNA PELÍCULA (ITERACIÓN 10):

router.get("/:id/edit", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const oneMovie = await MovieModel.findById(id)
        const allCast = await Celebrity.find()
        res.render("movies/edit-movie.hbs", {oneMovie, allCast})
    }
    catch(err){
        next(err)
    }
})

router.post("/:id/edit", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {title, genre, plot, cast} = req.body
        const update = await MovieModel.findByIdAndUpdate(id, {title, genre, plot, cast})
        res.redirect("/movies")
    }
    catch(err){
        next(err)
    }
})


module.exports = router;