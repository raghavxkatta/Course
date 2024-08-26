const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
.then(() => {
console.log('Connection is open');
})
.catch((err) => {
console.log('Oh no, there is an error');
console.log(err);
});



const movieSchema= Mongoose.Schema({
title:String,
year:Number,
score:Number,
rating:String 
});

const Movie=mongoose.model('movie',movieSchema)
const Ghajni= new Movie({title:'Ghajni',year:2005,score:9.2,rating:'R'})