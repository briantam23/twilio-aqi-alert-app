const router = require('express').Router();
const { User, City } = require('../db').models;


//get users
router.get('/', (req, res, next) => {
    User.findAll({
        include: [{ model: City }]
    })
        .then(users => res.send(users))
        .catch(next)
})

//get user by ID
router.get('/:userId', (req, res, next) => {
    User.findByPk(
        req.params.userId, 
        { include: [{ model: City }] }
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

router.delete('/:userId/cities/:cityId', (req, res, next) => {
    City.destroy({ 
        where: { 
            id: req.params.cityId 
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router;