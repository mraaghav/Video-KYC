// copy this function into your backend
exports.handler = function(context, event, callback) {
	let twiml = '';
	
	const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
	
	response.setBody({
        customerStatus: 'VIP',
        email: 'customerMail@email.com',
        address: 'BLK 877 22 Sengkang street 56 SINGAPORE 938772',
        phone: '+6598337837',
        history: [
            '06-09-2018: Called in to ask about payments',
            '23-04-2018: Emailed in to ask about shipment status',
            '17-10-2017: Successfully created account',
            '16-09-2017: Enquired about account creation and details'
        ]
    });
	
	callback(null, response);
};
