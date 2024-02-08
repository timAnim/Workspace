var mongoose = require('./db.js'),
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10,
    Schema = mongoose.Schema;

var StaffSchema = new Schema({
    "name": {
        type: String
    },
    "mobile": {
        type: String
    },
    "number": {
        type: String
    },
    "uid": {
        type: String
    },
    "position": {
        type: String
    },
    "mail": {
        type: String
    },
    "headurl": {
        type: String
    },
    "isadmin": {
        type: Boolean,
        default: false
    },
    "ptpreset": {
        type: String,
        default: null
    },
});

StaffSchema.pre('save', next => {
    // if (!this.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

StaffSchema.methods.comparePassword = function(candidatePassword, staff, cb) {
    bcrypt.compare(candidatePassword, staff.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('staff', StaffSchema, 'staff');