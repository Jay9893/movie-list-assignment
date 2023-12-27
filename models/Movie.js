// models/Movie.js

import mongoose from 'mongoose';

if (mongoose.models.Movie) {
  // Model already exists, no need to redefine
  module.exports = mongoose.models.Movie;
} else {
  const movieSchema = new mongoose.Schema({
    image: { 
      data: Buffer,
      contentType: String 
    },
    title: { type: String },
    publishingYear: { type: String },
  },{
    timestamps:true
  });

  module.exports = mongoose.model('Movie', movieSchema);
}
