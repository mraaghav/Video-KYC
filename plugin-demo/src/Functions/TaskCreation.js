/**
 * !IMPORTANT -------- READ THIS NOTICE -----------
 * Endpoint of this function should be in the client side code
 */

exports.handler = function(context, event, callback) {
	let twiml = '';
	var identity = 'Your name';
	var AccessToken = require('twilio').jwt.AccessToken;
    var VideoGrant = AccessToken.VideoGrant;
    const client = require('twilio')('accountsid', 'authtoken');
    
    const twilioAccountSid = 'accountsid';
    const twilioApiKey = 'apikey';
    const twilioApiSecret = 'apisecret';
    
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
    console.log(event)
    response.setBody({
        identiy: identity,
        token: token.toJwt(),
        room: event.room,
    });
    console.log(response);

    client.taskrouter.v1.workspaces('workspacesid') //change workspacesid
        .tasks
        .create({attributes: JSON.stringify({
                    task_type: "Video kyc",
                    type: "video",
                    name: "Kyc task",
                    direction: 'inbound',
                    title: "video kyc for customer",
                    identity: identity,
                    token: token.toJwt(),
                    room: event.room,
                    custId: event.identity
        }), 
            workflowSid: 'workflowsid',
            taskChannel: 'taskchannelsid'
        })
        .then(task => {console.log(task.taskChannelSid); callback(null, response)})
        .catch((error) =>  { console.log(error); callback(null, error) });
};