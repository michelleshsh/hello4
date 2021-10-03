var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find({}).populate('actors',"-__v").select('-__v').exec(function (err, movies) {
            if (err) return res.status(404).json(err);
            res.json(movies);
        });
    },

    getByYear: function (req, res) {
        Movie.find({ 
            $and: [
                { year: { $gte: req.params.year2 } },
                { year: { $lte : req.params.year1 } }
              ]
            }, function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            res.json(movies);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findByIdAndRemove(req.params.id, function (err, movie) {
            if (err){
                res.status(400).json(err);
            }
            if (!movie) return res.status(404).json();
            else{
                console.log("Removed User : ", movie);
                res.json(movie);
            };
        });
    },

    deleteByName : function (req,res){
        Movie.deleteMany({ title: req.body.title }, function (err,movies) {
            if (err){
                res.status(400).json(err);
            }
            res.json(movies);
          });
    },

    removeActor: function (req, res) {

        Movie.findByIdAndUpdate(req.params.mId, 
            { $pull: { actors: req.params.aId } }, 
             function (err, movie) {
                if (!err) {
                    if (!movie){
                        res.status(404).send("not document")
                    }
                    res.status(200).send(movie)
                } else {
                    res.status(400).send(err)
                }})
        },

    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },
    removeMovieBtYears: function (req, res) {
        Movie.deleteMany({ 
            $and: [
                { year: { $gte: req.body.year2 } },
                { year: { $lte : req.body.year1 } }
              ]
            }, function (err, movies) {
                if (err) return res.status(400).json(err);
                res.json(movies);
            })
    }
};