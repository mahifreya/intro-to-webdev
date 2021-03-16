
//add express
const express = require('express');

//initialize express
const app = express();

//make the GET request
app.get('/book', function(req, res){

    //make the GET request w/ query
    
    if (req.query.name === 'peter'){
        res.send('Cracking the Coding Interview');
    }
    
    if (req.query.name === 'becky'){
        res.send('The Pragmatic Programmer');
    }

    else {
        res.send('Pachinko');
    }
});

//make the GET request with route params
/*The third endpoint will be a GET request to /book/:userid. This will simply send "userid is really cool!" to the frontend.

    Example: a request to /book/peter will send "peter is really cool!" to the frontend.*/
    
app.get('/book/:userid', function(req, res) {
    let name = new String (req.params.userid);
    res.send(name + ' is very cool!');
});


//set up the server
app.listen(8080, function(){
    console.log("listening to the port 8080");
});

