const mongoose = require('mongoose');
const Author = mongoose.model('Author');

module.exports = {
    findAll: (req, res) => {
        Author.find({}, (err, authors) => {
            if(err){
                res.json({message: "Error", error: err});
            }else{
                res.json({message: "Success", authors: authors});
            }
        });
    },
    findOne: (req, res) => {
        console.log('Get Author By Id: ' + req.params.id)
        Author.findById({_id: req.params.id}, (err, author) => {
            if(err){
                res.json({message: "Error", error: err});
            }else{
                res.json({message: "Success", author: author});
            }
        });
    },
    update: (req, res) => {
        var query = {'_id': req.params.id};

        console.log('Attempting to update Author by Id: '+req.body.name);

        Author.findByIdAndUpdate(query, { name: req.body.name }, {upsert: true, new: true, runValidators: true}, function(err, author){
            if(err) {
                console.log('Something went wrong, could not update Author: '+req.params.id);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            } else {
                console.log(author)
                res.json({message: "Success", author: author});
            }
        });
    },
    create: (req, res) => {
        console.log('Attempt Create new Author: ' + req.body.name)
        var author = new Author({name: req.body.name});

        author.save((err) => {
            if(err) {
                console.log('Something went wrong while trying to create new author: ' + req.body);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            } else {
                console.log('Successfully created a new author: ' + req.body);
                res.json({message: "Success", author: author});
            }
        });
    },
    newQuote: (req, res) => {
        var query = {'_id': req.params.id};

        console.log('Attempt add New Quote to Author: ' + req.params.id);
        console.log('Attempting to add Quote: ' + req.body.content);

        Author.findByIdAndUpdate(query, {$push: { quotes: { content: req.body.content }}}, {upsert: true, new: true, runValidators: true}, function(err, author){
            if(err) {
                console.log('Something went wrong, could not update Author: '+req.params.id);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            } else {
                console.log(author)
                res.json({message: "Success", author: author});
            }
        });
    },
    deleteQuote: (req, res) => {
        var query = { '_id': req.params.a_id } ;

        console.log('Attempt to add a vote for Author: ' + req.params.a_id);
        console.log('Attempting to add a vote for Quote: ' + req.params.q_id);

        Author.findById(query, (err, author) => {
            if(err){
                res.json({message: "Error", error: err});
            }else{
                let quote;
                for(let i=0; i<author.quotes.length; i++){
                    if(author.quotes[i]._id == req.params.q_id){
                        quote=author.quotes[i];
                        author.quotes.splice(i, 1);
                        author.save();
                        break;
                    }
                }
                res.json({message: "Success", quote: quote});
            }
        });
    },
    voteQuote: (req, res) => {
        var query = { '_id': req.params.a_id } ;

        console.log('Attempt to add a vote for Author: ' + req.params.a_id);
        console.log('Attempting to add a vote for Quote: ' + req.params.q_id);

        Author.findById(query, (err, author) => {
            if(err){
                res.json({message: "Error", error: err});
            }else{
                let quote;
                for(let i=0; i<author.quotes.length; i++){
                    if(author.quotes[i]._id == req.params.q_id){
                        quote=author.quotes[i];
                        quote.votes += parseInt(req.body.vote);
                        author.save();
                        break;
                    }
                }
                res.json({message: "Success", quote: quote});
            }
        });
    },
    delete: (req, res) => {
        Author.remove({ _id: req.params.id }, (err, author) => {
            if(err){
                console.log('Something went wrong, could not remove author: '+req.params.id);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            }else{
                console.log('Successfully deleted an author!: '+req.params.id);
                res.json({message: "Success", author: author});
            }
        });
    }
} 