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
    let options = Object.assign({from: twilioPhone}, req.body, {
      type:'sent',
      to: `+${req.body.to.length === 10 ? ('1' + req.body.to) : req.body.to}`,
      status: 'unread'
    });
    twilioClient.messages.create(options, (err, message) => {
      if(err) {
        return res.serverError(err);
      } else {
        Message.create(options).exec(function (err, message){
          if (err) { return res.serverError(err); }
          sails.log(options);
          return res.send('Successfully created SMS!');
        });
      }
    });
  },
  receive: (req, res) => {
    let options = Object.assign({from: twilioPhone}, req.body, {
      type:'received',
      status: 'unread',
      body: req.body.Body
    });
    Message.create(options).exec(function (err, message){
      if (err) { return res.serverError(err); }
      sails.log(options);
      return res.send('Successfully received SMS!');
    });;
  },
  markRead: (req, res) => {
    Message.update({id: req.param('id')}, {status: 'read'}).exec(function (err, message){
      if (err) { return res.serverError(err); }
      sails.log(options);
      return res.send('Marked read for message: ' + message.id);
    });
  },
  markRead: (req, res) => {
    Message.update({id: req.param('id')}, {status: 'unread'}).exec(function (err, message){
      if (err) { return res.serverError(err); }
      sails.log(options);
      return res.send('Marked unread for message: ' + message.id);
    });
  },
  findByPhone: (req, res) => {
    Message.find({
      or : [
        { to: {contains: {id: req.param('number')}} },
        { from: {contains: {id: req.param('number')}} }
      ]
    }).exec(function (err, messages){
      if (err) { return res.serverError(err); }
      sails.log(options);
      return res.send(messages);
    });
  }
};
