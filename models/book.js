const mongoose = require("mongoose")
const bookSchema = mongoose.Schema({
   title : { type: String, required: true},
   Author :  {type: String , required: true},
   Publication_Year:{type: Date , required: true},
   Description:{type: String , required: true},
   Number_of_Pages:{type: Number , required: false},
   Language:{type: String , required: true},
   Genre_Category: [{ type: String, required: false }],
})
module.exports = mongoose.model("Book",bookSchema)