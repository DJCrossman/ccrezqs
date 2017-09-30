/**
 * Message.js
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
    status: {
      type: 'string',
      enum: ['read', 'unread'],
      required: true
    },
    type: {
      type: 'string',
      enum: ['received', 'sent'],
      required: true
    },
    to: {
      type: 'string',
      required: true
    },
    from: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    }
  }
};
