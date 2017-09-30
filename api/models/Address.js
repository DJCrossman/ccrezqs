/**
 * Address.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    street1: {
      type: 'string'
    },
    street2: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    province: {
      type: 'string'
    },
    postalCode: {
      type: 'string'
    },
    isRented: {
      type: 'boolean'
    },
    isPermitted: {
      type: 'boolean'
    },
    landlord: {
      type: 'string'
    },
    isYardFenced: {
      type: 'boolean'
    },
    dogLocation: {
      type: 'array'
    }
  }
};
