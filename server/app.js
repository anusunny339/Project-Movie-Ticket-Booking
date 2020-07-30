const express=require("express");
//const multer=require('multer');
//const path=require('path');
const Moviedata=require('./models/moviedata');
const Userdata=require('./models/userdata');
const bookingdata=require('./models/bookingdata');

const cors=require('cors');
var bodyparser=require('body-parser');
const jwt=require('jsonwebtoken')
var app=new express();
const port=3000;
app.use(cors());
app.use(bodyparser.json());

app.get('/movies',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*"); 
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    Moviedata.find()
    .then(function(movie){
        res.send(movie)
    })
});

app.get('/valueSet',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*"); 
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    values={
        username:'admin@gmail.com',
        password:'admin'
    }
    res.send(values)
});

app.post('/addMovie',function(req,res){
    
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*"); 
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    //res.header('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    //res.header('Access-Control-Expose-Headers' ,'Content-Length,Content-Range');
    console.log("jj");
    console.log(req.body)
     

    var movie={
        name:req.body.movie.name,
        certificate:req.body.movie.certificate,
        language:req.body.movie.language,
        type:req.body.movie.type,
        duration:req.body.movie.duration,
        director:req.body.movie.director,
        casting:req.body.movie.casting,
        releaseDate:req.body.movie.releaseDate,
        description:req.body.movie.description,
        price:req.body.movie.price,
        seats1:req.body.movie.seats1,
        seats2:req.body.movie.seats1,
        seats3:req.body.movie.seats1,
        seats4:req.body.movie.seats1,
        time1:req.body.movie.time1,
        time2:req.body.movie.time2,
        time3:req.body.movie.time3,
        time4:req.body.movie.time4,
        imgUrl:req.body.movie.imgUrl
        

    }

    var movie=new Moviedata(movie)
    movie.save((err,data)=>{
        if(err){console.log(err)
        }
        else{
            res.status(200).send(data)
        }
    });

  
});

app.post('/delete',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
   // console.log("delete")
    id=req.body.mid;
    console.log(id)
    Moviedata.deleteOne({_id:id},function(err,result){
        if(result){
            console.log("deleted")
        }
    })

})

app.post('/update',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
     id=req.body.mid;
     var movie={
        name:req.body.movie.name,
        certificate:req.body.movie.certificate,
        language:req.body.movie.language,
        type:req.body.movie.type,
        duration:req.body.movie.duration,
        director:req.body.movie.director,
        casting:req.body.movie.casting,
        releaseDate:req.body.movie.releaseDate,
        description:req.body.movie.description,
        price:req.body.movie.price,
        seats1:req.body.movie.seats1,
        seats2:req.body.movie.seats1,
        seats3:req.body.movie.seats1,
        seats4:req.body.movie.seats1,
        time1:req.body.movie.time1,
        time2:req.body.movie.time2,
        time3:req.body.movie.time3,
        time4:req.body.movie.time4,
        imgUrl:req.body.movie.imgUrl
        

    }

    //console.log(movie)
    Moviedata.updateOne({_id:id},{$set:movie})
    .then(function(movie){
        console.log(movie)
        res.send(movie)
    })
});

app.post('/updateSeats',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
     id=req.body.mid;
     console.log(req.body.movie)
     var movie={
        
        seats1:req.body.movie.seats1,
        seats2:req.body.movie.seats2,
        seats3:req.body.movie.seats3,
        seats4:req.body.movie.seats4
        

    }

    //console.log(movie)
    Moviedata.updateOne({_id:id},{$set:movie})
    .then(function(movie){
        console.log(movie)
        res.send(movie)
    })
});

app.post('/register',function(req,res){
    
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*"); 
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    console.log(req.body)
    var user={
        firstName:req.body.user.firstName,
        lastName:req.body.user.lastName,
        email:req.body.user.email,
        contactNo:req.body.user.contactNo,
        password:req.body.user.password
    }

    var user=new Userdata(user)
    user.save((err,data)=>{
        if(err){console.log(err)
        }
        else{
            res.status(200).send(data)
        }
    });

  
});

app.post('/login',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    username=req.body.email;
    password=req.body.password;
   

    
    Userdata.findOne({ $and : [{ 'email' :  username },{ 'password' : password} ]})
   
    .then(function(user){
        if(user){
            
            id=user._id;
            //res.send(user)
            console.log("login"+user)
           //res.send(user)
           let payload={subject:user._id}
           let token=jwt.sign(payload,'secretKey')
            res.send({token,id})
            // console.log(user._id)
        }

        else{
            res.send("invalid")
            console.log("invalid"+user)
           
        }
       
    })
})

app.post('/addbooking',function(req,res){
    
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*"); 
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    console.log(req.body)
     
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    let Bookingdate=year + "-" + month + "-" + date;
    var booking={
        movieName:req.body.data.movieName,
        time:req.body.data.time,
        seats:req.body.data.seats,
        amount:req.body.data.amount,
        userId:req.body.userId,
        date:Bookingdate,
        imgUrl:req.body.data.imgUrl
    }

    var booking=new bookingdata(booking)
   booking.save((err,data)=>{
        if(err){console.log(err)
        }
        else{
            res.status(200).send(data)
        }
    });

  
});


app.post('/bookings',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    id=req.body.userId;
    bookingdata.find({ 'userId' :  id}).sort({"_id":-1})
   
    .then(function(user){
        if(user){
            
            res.send({user})
             console.log(user)
        }

        else{
            res.send("not exist")
            console.log("invalid")
           
        }
       
    })
})

app.get('/allbookings',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*"); 
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    
   
    bookingdata.find().sort({"_id":-1})
    .then(function(bookings){
        if(bookings){
            res.send({bookings})
           // console.log(bookings)
         
        }
        else{
            res.send("err")
        }
        
    })
});

app.post('/categorize',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    Id=req.body.id;
    Moviedata.find({ 'type' :  Id})
   
    .then(function(movies){
        if(movies){
            
            res.send(movies)
             console.log(movies)
        }

        else{
            res.send("not exist")
            console.log("invalid")
           
        }
       
    })
})

app.listen(port,function(){
    console.log("server running on port"+port);
})