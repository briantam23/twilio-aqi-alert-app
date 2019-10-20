const router = require('express').Router();
const { User } = require('../db').models;
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const axios = require('axios');
const queryString = require('querystring');


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

router.get('/github', (req, res, next) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`;
    res.redirect(url);
})

let userId;

router.get('/github/callback', async(req, res, next) => {
    try{
        let response = await axios.post('https://github.com/login/oauth/access_token', {
            code: req.query.code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: process.env.GITHUB_REDIRECT_URI
        })
        const parsed = queryString.parse(response.data);
        const { error, access_token } = parsed;
        if(error) {
            throw({ message: error });
        }
        response = await axios.get(`http://api.github.com/user?access_token=${access_token}`)
        const { id, login } = response.data;
        const attr = { githubUserId: id }
        let user = await User.findOne({ where: attr });
        if(!user) {
            attr.githubUsername = `${login}`;
            user = await User.create(attr);
        }
        const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET)
        res.redirect(`/?token=${token}`)
    }
    catch(ex) { next(ex); }
})


module.exports = router;

module.exports = router;