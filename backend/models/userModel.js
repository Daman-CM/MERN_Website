const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        //this means that you can only have one account with a password
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {
    
    if(!email || !password ){
        
        throw Error('All fields must be filled')
        
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password is not strong enough');
    }
    
    //even though we already made sure that emails were unique, this is double protection 
    //but more because it gives a custom error
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use');
    }
    //These are salts(random string of charaters added to the users password before hashing)
    //This adds sercuity as it means that if users have the same password they have different salts and so different hashs
    //prevents password matching
    //Example of the same password with different salts
    // mypassworddj87w38ns9dn
    // mypassworddnd83jd9snws

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    
    const user = await this.create({ email, password: hash})
   
    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password ){
        
        throw Error('All fields must be filled')
        
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email');
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password');
    }

    return user
}

module.exports = mongoose.model('User', userSchema)