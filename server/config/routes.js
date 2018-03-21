const author_ctrl = require('../controllers/author_controller');

var path = require('path');

module.exports = (app) => {

    app.get('/authors/:id', (req, res) => {
        author_ctrl.findOne(req, res);
    });

    app.get('/authors', (req, res) => {
        author_ctrl.findAll(req, res);
    });

    app.put('/authors/:id', (req, res) => {
        author_ctrl.update(req, res);
    });

    app.put('/authors/:id/quote', (req, res) => {
        author_ctrl.newQuote(req, res);
    });

    app.delete('/authors/:a_id/quote/:q_id', (req, res) => {
        author_ctrl.deleteQuote(req, res);
    });

    app.put('/authors/:a_id/quote/:q_id/vote', (req, res) => {
        author_ctrl.voteQuote(req, res);
    });

    app.post('/authors', (req, res) => {
        author_ctrl.create(req, res);
    });

    app.delete('/authors/:id', (req, res) => {
        author_ctrl.delete(req, res);
    });
    
    app.all("*", (req,res,next) => {
    	res.sendFile(path.resolve("./client/dist/index.html"))
	});

}        