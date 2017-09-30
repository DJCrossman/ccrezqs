/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'localDiskDb'
  },

  connections: {
    twilio: {
      accountSid: 'ACf10f6415dada9953dbb5f373e623f40a',
      apiKey: 'SKb1492c5bad35aa2e58d64dd0e80facf0',
      apiSecret: 'i92iTigEcm18FmDypoo3OXbh3NSHISSa',
      phone: '+13069934716'
    },
    s3: {
      key: "AKIAIAZJFL3S34BIVDIQ",
      secret: "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",
      bucket: "ccrezqs"
    }
  }

};
