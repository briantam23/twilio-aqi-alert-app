const router = require('express').Router();
const { User, Alert } = require('../db').models;


//get users
router.get('/', (req, res, next) => {
    User.findAll({
        include: [{ 
            model: Alert 
        }]
    })
        .then(users => res.send(users))
        .catch(next)
})

//get user by ID
router.get('/:userId', (req, res, next) => {
    User.findByPk(
        req.params.userId, 
        { include: [{ model: Alert }] }
    )
        .then(user => {
            if(!user) return res.sendStatus(404);
            res.send(user);
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(next)
})

router.put('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => user.update(req.body))
        .then(_user => res.send(_user))
        .catch(next)
})

router.post('/:userId/alerts', (req, res, next) => {
    Alert.create(req.body)
        .then(alert => res.send(alert))
        .catch(next)
})

router.delete('/:userId/alerts/:alertId', (req, res, next) => {
    Alert.destroy({ 
        where: { 
            id: req.params.alertId 
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router;