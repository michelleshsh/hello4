//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');



const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actorsandmovie/:id',actors.deleteOneAndMovies)
app.delete('/actors/:aId/:mId', actors.removeMovie);
app.get('/averageActors', actors.averageActors); //fix up

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.get('/movies/:year2/:year1', movies.getByYear);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.post('/movies', movies.createOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:mId/:aId', movies.removeActor);
app.delete('/movies', movies.deleteByName);

app.delete('/moviesByYear', movies.removeMovieBtYears);
app.post('/movies/:id/actors', movies.addActor);
app.put('/averageActors', actors.averageActors);
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
