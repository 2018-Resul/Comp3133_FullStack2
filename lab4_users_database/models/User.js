const mongoose = require('mongoose');

const userData = require('../UserData.json')





var emailValidation = function (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

var cityValidation = function (city) {
    var validations = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    return validations.test(city)
};


function urlvalidation (string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}



const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'Enter  name please'],
        trim: true,
        lowercase: true
    },

    username: {
        type: String,
        required: [true, 'Enter username please'],
        trim: true,
        lowercase: true,
        minlength: 4,

    },

    email: {
        type: String,
        required: [true, 'Enter email please'],
        trim: true,
        lowercase: true,
        validate: [emailValidation, 'Enter email address...'],
    },


    address: {
        street: {
            type: String,
            required: [true, 'Enter street'],
            trim: true,
            lowercase: true
        },
        suite: {
            type: String,
            required: [true, 'Enter suite'],
            trim: true,
            lowercase: true
        },
        city: {
            type: String,
            required: [true, 'Enter city'],
            trim: true,
            lowercase: true,
            validate: [cityValidation, " something went wrong  please try again"]
        },

        zipcode: {

            type: String,
            required: [true, 'Enter zipcode'],
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /\d{5}-\d{4}/.test(v)
                },
                message: props => `${props.value} something went wrong  please try again`
            }
        },
        geo: {
            lat: {
                type: Number,
                rrequired: [true, 'Please enter langtitute'],
                trim: true,
                lowercase: true
            },
            lng: {
                type: Number,
                required: [true, 'Please enter longtitute'],
                trim: true,
                lowercase: true
            }
        }

    },


    phone: {
        type: String,
        required: [true, 'enter phone'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },

    },

    website: {
        type: String,
        required: [true, 'Enter website'],
        validate: [urlvalidation, 'Please enter valid website address'],
        trim: true,
        lowercase: true
    },
    company: {
        name: {
            type: String,
            required: [true, '<<<<<enter company name'],
            trim: true,
            lowercase: true

        },
        catchPhrase: {
            type: String,
            required: [true, 'Enter catch phrase'],
            trim: true,
            lowercase: true
        },
        bs: {
            type: String,
            required: [true, 'Enter bs'],
            trim: true,
            lowercase: true
        }
    }



});




const User = mongoose.model("User", UserSchema);
module.exports = User;



User.insertMany(userData);

