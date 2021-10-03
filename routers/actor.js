const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Actor.find({}).populate('movies',"-__v").select('-__v').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        console.log(req.body);
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
            if(err){
                console.log(err);
            }
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },


    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    deleteOneAndMovies: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function(err,actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json("Actor not found");
            else{
                Movie.deleteMany({_id: { $in: actor.movies}}, function (err, movie){
                    if (err) return res.status(400).json(err);
                    if (!movie) return res.status(404).json("Movie not found");
                })
            };
            res.json(actor);
        }
        )},      
    

    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },

    removeMovie: function (req, res) {
        Actor.findByIdAndUpdate(req.params.aId, 
            { $pull: { movies: req.params.mId } }, 
             function (err, actor) {
                                if (!err) {
                                    if (!actor){
                                        res.status(404).send("Actor doesnt exist")
                                    }
                                    res.status(200).send("Actor and Movies successfully deleted")
                                } else {
                                    res.status(400).send(err)
                                }
                            })
                        },
    
    averageActors: function (req, res) {
        Actor.updateMany({"name": {$regex: /^a/, $options: 'i'}}, {"$inc":{bYear:req.body.year}},function(err,actor){
            if (!err) {
                if (!actor){
                    res.status(404).send("Actor doesnt exist")
                }
                res.status(200).send("Actors updated")
            } else {
                res.status(400).send(err)
            }
        })}
    
};