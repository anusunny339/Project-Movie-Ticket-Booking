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

var newMovieSchema=new Schema({
    name:String,
    certificate:String,
    language:String,
    type:String,
    duration:String,
    director:String,
    casting:String,
    releaseDate:String,
    description:String,
    price:Number,
    seats1:Number,
    seats2:Number,
    seats3:Number,
    seats4:Number,
    seats5:Number,
    time1:String,
    time2:String,
    time3:String,
    time4:String,
    imgUrl:String
});

var Moviedata=mongoose.model('moviedata',newMovieSchema);


module.exports=Moviedata;
