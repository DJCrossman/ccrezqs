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
      accountSid: 'AC93f4cdcebf8ae43b8069d9f28e593682',
      apiKey: 'SKb1492c5bad35aa2e58d64dd0e80facf0',
      apiSecret: '437124257789104d13237e2af9158a3d',
      phone: '+13069942992'
    },
    s3: {
      key: "AKIAIAZJFL3S34BIVDIQ",
      secret: "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",
      bucket: "ccrezqs"
    }
  }

};
