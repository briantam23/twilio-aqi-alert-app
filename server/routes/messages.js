const router = require('express').Router();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


//Send SMS of Twilio error message to developer
/* process.on('uncaughtException', err => {
    console.log(err);
    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.OWN_PHONE_NUMBER,
            body: 'Twilio error: ' + err
        }), 
        (twilioErr, message) => {
            if(twilioErr) console.log('Twilio error: ' + twilioErr)
        }
}) */

router.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
});


module.exports = router;