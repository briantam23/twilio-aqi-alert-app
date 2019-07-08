const router = require('express').Router();
const { City } = require('../db').models;


router.get('/', (req, res, next) => {
    City.findAll()
      .then(cities => res.send(cities))
      .catch(next)
})

router.get('/:cityId', (req, res, next) => {
    City.findByPk(req.params.cityId)
      .then(city => {
        if(!city) return res.sendStatus(404);
        res.send(city)
      })
      .catch(next)
})


module.exports = router;