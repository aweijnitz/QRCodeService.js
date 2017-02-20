//var appConf = require('../conf/appConfig.json');
var os = require('os');
var fs = require('fs');
var all = require("promised-io/promise").all;

var path = require('path');
var util = require('util');
var formidable = require('formidable');
//var logger = require('log4js').getLogger("upload");


/**
 * Private helper to sanity check a string before using it.
 * @param str
 * @returns {boolean}
 */
var isDefined = function (str) {
    return (typeof str != 'undefined' && null != str && '' != str);
}

/**
 * Check that dir exists
 * @param dir
 * @returns {boolean}
 */
var exists = function exists(dir) {
    var stat = fs.statSync(dir);
    return stat.isDirectory();
};


/**
 * Public. Takes care of form parsing and processing of form fields.
 * @param req
 * @param res
 */
var handleForm = function(appConf, log4js) {
    var logger = log4js.getLogger("upload");

    // Local conf
    var uploadDir = os.tmpdir();
    if (isDefined(appConf.app.uploadDir) && appConf.app.uploadDir != 'use-os-tmp-dir') {
        uploadDir = path.resolve(appConf.app.uploadDir) + path.sep;
        if(!exists(uploadDir))
            logger.fatal('CANNOT FIND UPLOAD DIR AT' + uploadDir);
    }

    var maxFormSize = (appConf.app.maxTotalUploadSizePerRequestInMB || 6) * 1024 * 1024;
    var maxFileSize = (appConf.app.maxFileSizeMB || 5) * 1024 * 1024;

    return function handleUpload (req, res) {

        var form = new formidable.IncomingForm({
            multiples: false,
            uploadDir: uploadDir,
            keepExtensions: true,
            maxFieldsSize: 1024,
            maxFields: 100,
            maxFileSize: maxFileSize,
            maxFormSize: maxFormSize
        });

        form.parse(req, function (err, fields, files) {
            if (err) {
                logger.debug('Form processing done. Found error: ' + util.inspect(err));
                res.render('error', { error: err});
            } else {
                logger.debug('RECEIVED FIELDS ---------------------');
                logger.debug(util.inspect(fields));
                logger.debug('RECEIVED FILES  ---------------------');
                logger.debug(util.inspect(files));

                res.render('done', { fields: fields, files: files});
            }

        });
    };
};

module.exports = handleForm;
