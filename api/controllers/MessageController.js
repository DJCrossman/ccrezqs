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
var apiai = require('apiai');
var ai = apiai("d0d677bc7a1748fa90c048b54d789435");
var actions = require('./Actions.js');

let dogImages = [];

function ask(text, options) {
  return new Promise((resolve, reject) => { 
  let apiaiRequest = ai.textRequest(text, options);
  apiaiRequest.on('response', (response) => {
        resolve(response); 
    })
    apiaiRequest.on('error', (error) => { 
      console.log(error); 
    });
    apiaiRequest.end();
  });
}

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

    const body = req.body;

    ask(req.body.Body, {
      sessionId: req.body.From,
      //resetContexts: true,
      contexts: [{ name: req.body.From }]
    }).then((resp) => {
      console.log(resp);
      const result = resp.result;
      console.log(body);
      if (body.MediaUrl0) {
        dogImages.push(body.MediaUrl0);
      }
      body.images = dogImages;
      console.log(dogImages);
      if (!result.actionIncomplete 
        && (result.action == 'book-appointment' 
        || result.action == 'new-dog'
        || result.action == 'subscribe-to-dog')) {
        ai.textRequest('', {
          sessionId: req.body.From,
          resetContexts: true
        });
        actions.doAction(result, body).then((rezzy) => {
          dogImages.shift();
          return res.send(rezzy);
        });
      } else {
        return res.send('<Response><Message>' + resp.result.fulfillment.speech + '</Message></Response>');                
      }
    });

    // Message.create(options).exec(function (err, message){
    //   if (err) { return res.serverError(err); }
    //   sails.log(options);
    //   return res.send('Successfully received SMS!');
    // });
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
  },
};