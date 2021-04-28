const express = require('express'),
    tripsRoutes = require('./trips');

var router = express.Router();

//change ' _'
router.get('/trips', tripsRoutes.getTours);
router.get('/trips', tripsRoutes.getTour);
router.post('/trips', tripsRoutes.createTour);
router.post('/trips/:id', tripsRoutes.createSiteInPath);
router.put('/trips/:id', tripsRoutes.updateTour);
router.delete('/trips/:id', tripsRoutes.deleteTour);
router.delete('/trips/:id', tripsRoutes.deleteSite);

module.exports = router;