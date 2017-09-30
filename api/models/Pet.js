/**
 * Pet.js
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
    name: {
      type: 'string'
    },
    state: {
      type: 'string',
      enum: ['pending', 'approved', 'denied', 'adopted', 'fostered'],
      required: true
    },
    species: {
      type: 'string',
      required: true
    },
    breed: {
      type: 'string',
      required: true
    },
    traits: {
      type: 'string'
    },
    birthdate: {
      type: 'date',
      required: true
    },
    sex: {
      type: 'string',
      enum: ['male', 'female', 'other'],
      required: true
    },
    diet: {
      type: 'string'
    },
    tatoo: {
      type: 'string'
    },
    microchip: {
      type: 'string'
    },
    photo: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  }
};
