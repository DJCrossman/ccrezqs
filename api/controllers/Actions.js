var moment = require('moment');
const twilioAccountSid = sails.config.connections.twilio.accountSid;
const twilioApiKey = sails.config.connections.twilio.apiKey;
const twilioApiSecret = sails.config.connections.twilio.apiSecret;
const twilioPhone = sails.config.connections.twilio.phone;

//App Clients
var twilioClient = require('twilio')(twilioAccountSid, twilioApiKey, { accountSid: twilioAccountSid });

module.exports = {
    doAction(result, body) {
        return new Promise((resolve, reject) => {
            if (result.action == 'book-appointment') {
                resolve(this.bookVetAppointment(result));
            } if (result.action == 'new-dog') {
                resolve(this.addNewDog(result, body));
            } if (result.action == 'subscribe-to-dog') {
                resolve(this.subscribeToDog(result, body));
            }
        });
    },
    bookVetAppointment(result) {
        const p = result.parameters;
        const medName = p.Medical == '' ? '' : 'for ' + p.Medical;
        Pet.findOne({name: p['Dog-Ids']}).populate('owners').exec((err, dog) => {
            dog.owners.forEach(owner => {
                console.log(owner);
                twilioClient.messages.create({
                    from: twilioPhone,
                    to: owner.phone,
                    body: `Update: ${p['Dog-Ids']}, ${medName} appointment at ${p.time} on ${p.date}`
                  }, (err, msg) => {
                    if (err) { console.log(err); }
                    console.log(msg);
                  });
            });
        });
        let type = '';
        if (p.Medical == "Shots") {
            type = 'vaccine'
        } else if (p.Medical == "Vet") {
            type = 'medical'
        }
        Event.create({
            title: `Appointment for ${p['Dog-Ids']}`,
            type,
            when: p.date,
            description: `${p.Medical} at ${p.time} on ${p.date}`
        }).exec((err, msg) => {
            sails.log('new event created');
        });
        return `<Response><Message>Okay, I have booked ${p['Dog-Ids']} ${medName} at ${p.time} on ${p.date}</Message></Response>`;         
    },
    addNewDog(result, body) {
        return new Promise((resolve, reject) => {
            const p = result.parameters;
            let birthdate = p.date;
            if (p.date == '')
                birthdate = new moment().subtract(p.age.unit, p.age.amount).format();
            
            const pet = {
                name: p['Dog-Ids'],
                birthdate,
                breed: p.Breed,
                sex: p.Gender,
                state: 'pending',
                species: p.Breed,
                photo: body.images[0],
                traits: [p.traits, p.traits1]
            }
            Pet.create(pet).exec(function (err, message){
                if (err) { 
                    sails.log(err);
                    resolve('<Response><Message>Unable to save pet, sorry</Message></Response>'); 
                }
                sails.log(pet);
                Event.create({
                    title: `New rescue: ${p['Dog-Ids']}`,
                    type: 'checked-in',
                    description: `${pet.sex} ${pet.breed} - born on: ${pet.birthdate}`
                }).exec((err, msg) => {
                    sails.log('new event created');
                });
                resolve(`<Response><Message>
                Okay, I have added ${p['Dog-Ids']} the ${pet.species} - Born on: ${pet.birthdate}
                </Message></Response>`);        
            });
        });
    }, subscribeToDog(result, body) {
        return new Promise((resolve, reject) => {
            const p = result.parameters;
            Pet.findOne({name: p['Dog-Ids']}).populate('owners').exec(function(err, dog) {
                if (err) { 
                    sails.log(err);
                    resolve('<Response><Message>That dog does not exist</Message></Response>'); 
                }
                let phone = p['phone-number'];
                if (p['phone-number'] == '') {
                    phone = body.From;
                }
                console.log(phone);
                Owner.findOne({phone}).populate('pets').exec(function(err, owner) {
                    console.log(owner);
                    owner.pets.add(dog.id);
                    dog.owners.add(owner.id);
                    owner.save((err) => {
                        dog.save((err) => {
                            resolve(`<Response><Message>
                            Okay, ${owner.firstName} ${owner.lastName} will receive updates about ${dog.name}
                            </Message></Response>`);  
                        });
                    });
                });
            });
        });
    }
}