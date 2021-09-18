cd drivename/foldername
mkdir newFolderName

// if we want to use npm packages like express then we need to create json file first so that or do npm init in that folder to create json file

cd newFolderName
npm init

/// now package.json file has been created
////////////version is in the form of a_.b_.c_ => a denotes major changes, b denotes minor feature additions, c denotes some bug fixes

/// after above steps now we can install any npm package

npm install --save express
// --save saves in dependencies i.e dependencies required during whole project i.e prroduction level

npm install --save-dev nodemon
// --save-dev saves in devDependencies i.e depenencies required during development

//nodemon helps in automatic update of code

nodemon index.json  // it will watch index.js


//////////////////////////////////

index.js file

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

app.listen(5000);  // now it is listening on that port number

//////////////////////////////////////////////////////////

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

//CRUD -> POST, GET , PUT , DELETE
//read

app.get('/', (req, res)=>{
    res.send("Hello");
})


app.listen(5000);  // now it is listening on that port number

// here nodemon sees that 5000 port is called then after '/' it want to read something and display on website then it sees that in file only it is mentioned app.get('/'), there function is being mentioned which will be called
////////////////////////////////////////

we could also write above one as:

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

//CRUD -> POST, GET , PUT , DELETE
//read

const slash = (req, res)=>{
    res.send("Hello");
};

app.get('/', slash);

app.listen(5000);  // now it is listening on that port number


///////////////////////////////////////////

for other CRUD operations:
const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

//CRUD -> POST, GET , PUT , DELETE
//read

const slash = (req, res)=>{
    res.send("Hello");
};

app.get('/', slash);
app.post('/',slash);
app.put('/', slash);
app.delete('/', slash);

app.listen(5000);  // now it is listening on that port number

/// Now at each operation hello function would be called but for checking that we could check on postman software

//////////////////////////////////////////////////////////////////////////////////////////

// for sending status 

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

//CRUD -> POST, GET , PUT , DELETE

app.get('/', (req, res)=>{

    res.sendStatus(201); // updated successfully
    res.send();
    //or use 
    //res.json();

    // res.send = return 
    // res.send acts as return statement i.e after that no other line execute

    //basically res is a function like below:
   /*
    res ={
        sendStatus:() => null,
        send: () => return 
    }
    */


});

app.listen(5000);  // now it is listening on that port number

//////////////////////////////////////////////////////////////////////////////////////////

// pipelining: i.e one function after other

const express = require('express');  
const app = express();

//CRUD -> POST, GET , PUT , DELETE

app.get('/', (req, res)=>{

    res.status(500).send("database not connecting");

});

app.listen(5000);  // now it is listening on that port number

//////////////////////////////////////////////////////////////////////////////////////////

///related to urls params

const express = require('express');  
const app = express();

//CRUD -> POST, GET , PUT , DELETE

app.get('/', (req, res)=>{

    res.status(500).send("database not connecting");

});

//
// http://localhost:5000/products?limit=50&q=something

// products?limit=50&q=something  -> query param

// "limit":"50"   // this is status variable : limit, q
// "q": "something"


app.get('/products', (req,res)=>{
    res.send(req.query);  // due to req.query whatsoever is written in query param is converted to object thus 158,159nwill be returned

})

app.listen(5000);  // now it is listening on that port number


////////////////////////////////////////////////////////////////////////////////////
encodeURIComponent is used only for values in url

// when we have url in which '&' is involved in a value of paramter

///Then we simply need to go to inspect element console of that webpage and in that we need to write 
encodeURIComponent(something&something)
///this will return some new words which we need to put in url so that it doesnt takes value of that particular key sepearately

// http://localhost:5000/?q=something&something

/// due to '&' 2 something would be treated as different keys and values

// so when we do encodeURIComponent in console of browser it will return a speccific value

///// http://localhost:5000/?q=something%26something

///and now it wont be treated as separate key value pair

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

app.get('/', (req, res)=>{
    res.status(200);   // here it will give value of status as well as below value
    res.json(req.query);
});

app.post('/', (req,res) =>{
    res.json({text:req.body})
})

app.listen(5000);  // now it is listening on that port number




//till 6:23 day 8 video


/////////////////////////////////////////////////////////////////////
//52.28 - 58.23
// some more variations as per path
const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();


app.get('/', (req, res)=>{
    res.status(500).send("database not connecting");
});


app.get('/ab?cd', (req,res)=>{    //http://localhost:5000/acd
    res.send('abcd');
})    // when b is optional

app.get('/ab+cd', (req,res)=>{    //http://localhost:5000/abbbbbbbbbbbbbbbbbbbbbbbbbbbbbcd
    res.send('abcd');
}) // when we want to write b any number of times

app.get('/ab*cd', (req,res)=>{    //http://localhost:5000/abRANDOMcd
    res.send('abcd');
}) // when there could be anything after ab but it should have cd in the end then we need to put * in between

app.get('/ab(cd)?e', (req,res)=>{    //http://localhost:5000/abcde
    res.send('abcd');
}) // when cd both are optional 

app.get(/a/, (req,res)=>{    //http://localhost:5000/aaaaaaaaaaaaaaaabRANDOMcd
    res.send('/a/');
}) // when we want to use regex // here it is important that, that regex need to start form a

app.get(/.*fly$/, (req,res)=>{    //http://localhost:5000/butterfly    or  //http://localhost:5000/dragonfly 
    res.send('/.*fly$/');
}) // when we want to use regex // here fly is at the end

app.get('/user/:usersId/books/:booksId', (req,res)=>{    //http://localhost:5000/user/1/books/2
    res.send(req.params);
}) // when we want to have some fixed and some changable variables like here users word is fix but usersId is dynamic as per diff ids or users, for dynamic ones we use ':' before the varible in which we want that id
  //  use query.param

app.get('/user/:usersId/books/:booksId', (req,res)=>{    //http://localhost:5000/user/1/books/2
    console.log(req.query); // for printing key value pair of url on console i.e this output would be shown on console of nodeJs
    res.send(req.params);
}) // when we want to have some fixed and some changable variables like here users word is fix but usersId is dynamic as per diff ids or users, for dynamic ones we use ':' before the varible in which we want that id
  //  use query.param

app.listen(5000);  // now it is listening on that port number




// require express
//called its function

// crud methods
