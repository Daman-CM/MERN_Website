//In this file, we make a Schema for the Model which enforces a struction on the documents
//that we send to the database(what properties that thet should have and what types they should be)
//We make a Model based on this Schema and export it so that it can be used in another file
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Describes the Structure of the Documents
const foodSchema = new Schema({
    Name: {
        type : String,
        required : true
        },
    Company: {
        type: String,
        required: true
        },
    Amount:{
        type: Number,
        required: true
        },
    Calories: {
        type: Number,
        required : true
        },
    user_id:{
        type : String,
        required : true
    }
}, { timestamps: true})

// This model creates a Collection that has to have the foodSchema
// Food because it automatically creates a 
// pural Collecction in this case Foods
// The model is then import to other files 
// later on and used to interact with the Foods Collection
module.exports = mongoose.model('Food', foodSchema )
