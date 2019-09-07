const router = require('express').Router();
const { User } = require('../db').models;
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');


router.get('/', (req, res, next) => {
    if(!req.user) return next({ status: 401 });

    res.send(req.user);
})

router.post('/', (req, res, next) => {
    const { username, password } = req.body;
    
    User.findOne({ where: { username } })
        .then(user => {
            if(!user) return next({ status: 401 });

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(isMatch) {
                    const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
                    res.send({ token });
                }
                else return next({ status: 401 });
            })
        })
        .catch(next)
})


module.exports = router;