const PORT = process.env.PORT || 3000;
const { syncAndSeed } = require('./db');


require('./app').listen(PORT, () => console.log(`

        Listening on PORT ${PORT}!
        http://localhost:${PORT}
`))


syncAndSeed();