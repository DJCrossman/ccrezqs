/**
 * Owner.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'string',
      unique: true,
      primaryKey: true,
      defaultsTo: function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    birthdate: {
      type: 'date',
      required: true
    },
    address: {
      type: 'address',
      required: true
    },
    phone: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'string'
    },
    occupation: {
      type: 'string'
    },
    schedule: {
      type: 'string',
      enum: ['Very Busy', 'Busy', 'Not Busy']
    },
    pets: {
      type: 'array'
    },
    hasFostered: {
      type: 'boolean',
      required: true
    },
    fosterExperience: {
      type: 'string'
    },
    agePreference: {
      type: 'array'
    },
    hoursAlone: {
      type: 'float'
    },
    hoursExercising: {
      type: 'float'
    },
    periodicVisit: {
      type: 'boolean'
    },
    hesitations: {
      type: 'string'
    },
    campaign: {
      type: 'string'
    }
  }
};
