var moment = require('moment');

module.exports = {
    doAction(result, body) {
        return new Promise((resolve, reject) => {
            if (result.action == 'book-appointment') {
                resolve(this.bookVetAppointment(result));
            } if (result.action == 'new-dog') {
                resolve(this.addNewDog(result, body));
            }
        });
    },
    bookVetAppointment(result) {
        const p = result.parameters;
        const medName = p.Medical == '' ? '' : 'for ' + p.Medical;
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
                photo: body.MediaUrl0
            }
            Pet.create(pet).exec(function (err, message){
                if (err) { 
                    sails.log(err);
                    resolve('<Response><Message>Unable to save pet, sorry</Message></Response>'); 
                }
                sails.log(pet);
                resolve(`<Response><Message>
                Okay, I have added ${p['Dog-Ids']}
                Born on: ${pet.birthdate}
                Species: ${pet.species}
                </Message></Response>`);        
            });
        });
    }
}