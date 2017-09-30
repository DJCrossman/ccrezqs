/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 // Twilio Credentials
const twilioAccountSid = sails.config.connections.twilio.accountSid;
const twilioApiKey = sails.config.connections.twilio.apiKey;
const twilioApiSecret = sails.config.connections.twilio.apiSecret;
const twilioPhone = sails.config.connections.twilio.phone;

//App Clients
var twilioClient = require('twilio')(twilioApiKey, twilioApiSecret, { accountSid: twilioAccountSid });

module.exports = {
	send: (req, res) => {
    let options = Object.assign({from: twilioPhone}, req.body, {type:'sent', to: `+${req.body.to.length === 10 ? ('1' + req.body.to) : req.body.to}`});
    twilioClient.messages.create(options, (err, message) => {
      if(err) {
        return res.serverError(err);
      } else {
        Message.create(message).exec(function (err, options){
          if (err) { return res.serverError(err); }
          sails.log(options);
          return res.send('Successfully created SMS!');
        });
      }
    });
  },
  receive: (req, res) => {
    let message = req.body || {};
    message.type = 'received';
    Message.create(message).exec(function (err, message){
      if (err) { return res.serverError(err); }
      sails.log(message);
      return res.send('Successfully created SMS!');
    });;
  }
};
