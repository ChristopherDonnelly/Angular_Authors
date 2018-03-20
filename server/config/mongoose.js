const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authors');

var AuthorSchema = require('../models/author_model');

const Author = mongoose.model('Author', AuthorSchema);