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


var bookingSchema=new Schema({
    movieName:String,
    time:String,
    seats:Number,
    amount:String,
    userId:String,
    date:String,
    imgUrl:String
});

var bookingdata=mongoose.model('bookingdata',bookingSchema);
module.exports=bookingdata;