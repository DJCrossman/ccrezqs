/**
 * PetController
 *
 * @description :: Server-side logic for managing pets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// S3 Credentials
const s3Key = sails.config.connections.s3.key;
const s3Secret = sails.config.connections.s3.secret;
const s3Bucket = sails.config.connections.s3.bucket;

module.exports = {
	photo: (req, res) => {
    req.file({id: req.param('id')}).upload({
      adapter: require('skipper-s3'),
      key: s3Key,
      secret: s3Secret,
      bucket: s3Bucket
    }, function (err, filesUploaded) {
      if (err) return res.negotiate(err);
      Pet.update({id: req.param('id')}, {photo: true}).exec(function (err, message){
        if (err) { return res.serverError(err); }
        return res.ok({
          files: filesUploaded,
          textParams: req.params.all()
        });
      });

    });
  }
};
