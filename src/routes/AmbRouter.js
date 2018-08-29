// routes for AMB model
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var AmbRouter  = express.Router();          // get an instance of the express Router for the current data model

var Amb        = require('../models/Amb');  // includes the data model

// stub to log all requests
AmbRouter.use(function(req, res, next) {
    // do logging
    console.log(Date().toString() + ' - Something is happening.');

    // TODO : check authentication / privileges ...

    // at the end ...
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
AmbRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// canonical routes for our API follow here

// --------------------------------------------------------
// create a new Amb instance from the request
AmbRouter.route('/ambs/add').post(function(req, res) {
    var Amb = new Amb(req.body);  
    console.log('POST ' + req.body);

    Amb.save()
    .then(Amb => {
        res.json('Amb added successfully!');
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
})
	
// --------------------------------------------------------
// get all the Ambs (accessed at GET http://localhost:3000/api/ambs)
AmbRouter.route('/ambs/').get(function(req, res) {
	Amb.find(function(err, ambs) {
		if (err){
            console.log(err);
        }
        else{
            res.json(ambs);
        }
	});
});

// ----------------------------------------------------
// get a single Amb (routes end in /ambs/:amb_id)
AmbRouter.route('/ambs/:amb_id').get(function(req, res) {
    Amb.findById(req.params.amb_id, function(err, amb) {
        if (err){
            res.json(err);
        }
        else{
            res.json(amb);
        }
    });
});

// ----------------------------------------------------
// update the Amb 
AmbRouter.route('/ambs/:amb_id').put(function(req, res) {
    Amb.findById(req.params.amb_id, function(err, amb) {
        if (err){
            res.json(err);
        }
        else{
            // update the ambs info
            amb.name = req.body.name;  
            amb.url = req.body.url;
            amb.credentials = req.body.credentials;
            amb.notes = req.body.notes;

            // save the amb
            amb.save().then(amb => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
        }
    });
});

// ----------------------------------------------------
// delete the amb
AmbRouter.route('/ambs/:amb_id').delete(function(req, res) {
    Amb.findByIdAndRemove(
        {_id: req.params.amb_id},
        function(err, amb) {
            if (err)
                res.json(err);
            else res.json('Amb Successfully removed');
        }
    );
});

// module exports = AmbRouter;