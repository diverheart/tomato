var mongoose=require('mongoose');

var userSchema = new mongoose.Schema({
    mail:String,
    password:String,
  });


module.exports= new mongoose.model('Person',userSchema);