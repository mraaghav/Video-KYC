// Copy this into your twilio function
exports.handler = function(context, event, callback) {
	let twiml = '';
	
	var faker = require("faker");
	var identity = faker.name.findName();
	var AccessToken = require('twilio').jwt.AccessToken;
    var VideoGrant = AccessToken.VideoGrant;
    const client = require('twilio')('acountsid', 'authtoken');
    
    const twilioAccountSid = '';
    const twilioApiKey = '';
    const twilioApiSecret = '';
	
	const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    var token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret
    );
    token.identity = identity;
	
	var grant = new VideoGrant();
    token.addGrant(grant);

    response.setBody({
        identiy: identity,
        token: token.toJwt(),
    });
    
	callback(null, response);
};
