const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/TicketDb',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("connected")
    }
});
const Schema=mongoose.Schema;


var UserSchema=new Schema({
    firstName:String,
    lastName:String,
    email:String,
    contactNo:String,
    password:String
});

var userdata=mongoose.model('user',UserSchema);
module.exports=userdata;