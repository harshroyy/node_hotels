const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { setThePassword } = require('whatwg-url');

const personSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type : Number
    },
    work: {
        type: String, 
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

personSchema.pre('save', async function(next) {
    const person  = this;

    // hash password generate , if modified
    if(!person.isModified('password')) return next();

    try{
           const salt = await bcrypt.genSalt(10);

           // hash password
           const hashedPassword = await bcrypt.hash(person.password, salt);

           // override thhe plain password with the hashed one
           person.password = hashedPassword;
           next();
    }catch(err) {
           return next(err);
    }
})

// Define the comparePassword method on the personSchema
personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        // Use bcrypt to compare the plaintext password (candidatePassword) with the hashed password (this.password)
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err) {
        throw err;
    }
}

// create perform models
const Person = mongoose.model("Person", personSchema);
module.exports = Person;