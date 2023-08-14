// Import the required modules
const mongoose = require('mongoose');



// Define a schema
const Schema = mongoose.Schema;
const Studentschema = new Schema({
  name: String,
  email: String,
  attendence: Number
  
});

// Compile the schema into a model

const studentmodel=mongoose.model('Student', Studentschema);

module.exports=studentmodel;