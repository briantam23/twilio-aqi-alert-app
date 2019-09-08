const router = require('express').Router();
const { User, Alert } = require('../db').models;
const bcrypt = require('bcrypt');


//get users
router.get('/', (req, res, next) => {
    User.findAll({
        include: [{ model: Alert }]
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
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds)
        .then(salt => {
            console.log(`Salt: ${salt}`);
            return bcrypt.hash(req.body.password, salt);
        })
        .then(hash => {
            console.log(`Hash: ${hash}`);
            User.create({ ...req.body, password: hash })
                .then(user => res.send(user))
                .catch(next)
        })
        .catch(err => console.error(err.message))
})

//Incorporate salt/hash for put
router.put('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => user.update(req.body))
        .then(_user => res.send(_user))
        .catch(next)
})

router.delete('/:userId', (req, res, next) => {
    User.destroy({
        where: { id: req.params.userId }
    })
        .then(err => {
            if(err === 0) return res.sendStatus(500);
            res.sendStatus(204);
        })
        .catch(next)
})

router.post('/:userId/alerts', (req, res, next) => {
    Alert.create(req.body)
        .then(alert => res.send(alert))
        .catch(next)
})

router.delete('/:userId/alerts/:alertId', (req, res, next) => {
    Alert.destroy({ 
        where: { id: req.params.alertId }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router;