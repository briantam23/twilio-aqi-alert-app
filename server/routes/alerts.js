const router = require('express').Router();
const { Alert } = require('../db').models;


router.get('/', (req, res, next) => {
    Alert.findAll()
      .then(cities => res.send(cities))
      .catch(next)
})

router.get('/:alertId', (req, res, next) => {
    Alert.findByPk(req.params.alertId)
      .then(alert => {
        if(!alert) return res.sendStatus(404);
        res.send(alert)
      })
      .catch(next)
})


module.exports = router;