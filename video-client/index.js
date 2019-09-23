var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var faker = require("faker");

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/token', (req, res) => {
    var identity = faker.name.findName();
    const twilioAccountSid = '';
    const twilioApiKey = '';
    const twilioApiSecret = '';

    var token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret
      );
    token.identity = identity;

    var grant = new VideoGrant();
    token.addGrant(grant);

    res.status(200).send({
        identiy: identity,
        token: token.toJwt(),
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
});

app.post('/create-room', (req, res) => {
    client.video.rooms
        .create({
        recordParticipantsOnConnect: true,
        statusCallback: '',
        type: 'group',
        uniqueName: 'DailyStandup'
        })
        .then(room => console.log(room.sid))
        .then(() => { res.status(200).json('room created')});
})