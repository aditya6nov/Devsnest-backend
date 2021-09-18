
// here we have written two functions
// here, next function(acts as main function) would be called after first function executes well, get executed
// this is how middlewares work, first test function is executed that everything is working fine and after that main function works (as here)with the help of next


////// middleware is a function which executes just before actual function  //////

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

app.get('/', (req, res, next)=>{
    console.log(" in first");       // output will be on node console
    next();
}
,(req, res)=>{
    res.status(200);                // ouput will be on postman 
    res.json(req.query);
});

app.post('/', (req,res) =>{
    res.json({text:req.body})
})

app.listen(5000);


//////////////////////////////////////////////////////

//Eg: we need to check if present person is admin or not and according to that we want to give access then we will do followig things

// http://localhost:5000/?admin=true

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const app = express();

app.get('/', (req, res, next)=>{
    console.log("in first" , req.query);       // output will be on node console
    if(req.query.admin === 'true') {          // using === to stringify   // we get a url's query through.. req.query()
    next();
    }
    else {
        res.status(400).send("should be admin");
    }
}
,(req, res)=>{
    res.status(200);                // ouput will be on postman 
    res.json(req.query);
});

app.post('/', (req,res) =>{
    res.json({text:req.body})
})

app.listen(5000);

/////////////////////////////////////////////////

// beautifying above 


const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const { send } = require('process');
const app = express();

const checkAdmin = (req, res, next)=>{
    console.log("in first" , req.query);       // output will be on node console
    if(req.query.admin === 'true') {          // using === to stringify   // we get a url's query through.. req.query()
    next();                                   // next function
    }
    else {
        res.status(400).send("should be admin");
    }
};

const sendRes = (req, res)=>{
    res.status(200);                // output will be on postman 
    res.json(req.query);
};

app.get('/', checkAdmin, sendRes);

app.post('/', (req,res) =>{
    res.json({text:req.body})
})

app.listen(5000);

//////////////////////////////////////////////////////////

// we could use checkAdmin middleware in varius other apis too...

///like....

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const { send } = require('process');
const app = express();

const checkAdmin = (req, res, next)=>{
    console.log("in first" , req.query);       // output will be on node console
    if(req.query.admin === 'true') {          // using === to stringify   // we get a url's query through.. req.query()
    next();                                   // next function
    }
    else {
        res.status(400).send("should be admin");
    }
};

const sendRes = (req, res)=>{
    res.status(200);                // output will be on postman 
    res.json(req.query);            // {"admin" : "true"}
};

app.get('/', checkAdmin, sendRes);

app.post('/', checkAdmin, (req,res) =>{
    res.json({text:req.body})
})

app.get('/',checkAdmin , (req, res)=>{
    res.status(500).send("database not connecting");
});


app.get('/ab?cd', checkAdmin,(req,res)=>{    //http://localhost:5000/acd
    res.send('abcd');
})    // when b is optional

app.get('/ab+cd', (req,res)=>{    //http://localhost:5000/abbbbbbbbbbbbbbbbbbbbbbbbbbbbbcd
    res.send('abcd');
}) // when we want to write b any number of times

app.get('/ab*cd', (req,res)=>{    //http://localhost:5000/abRANDOMcd
    res.send('abcd');
}) 


app.listen(5000);


//////////////////////////////////////////////////////

//if we want to use checkAdmin middleware with every api then we will use app.use()


const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const { send } = require('process');
const app = express();

const checkAdmin = (req, res, next)=>{
    console.log("in first" , req.query);       // output will be on node console
    if(req.query.admin === 'true') {          // using === to stringify   // we get a url's query through.. req.query()
    next();                                   // next function
    }
    else {
        res.status(400).send("should be admin");
    }
};

app.use(checkAdmin);  // whatsoever middleware would be put here it will run in all apis

const sendRes = (req, res)=>{
    res.status(200);                // output will be on postman 
    res.json(req.query);
};

app.get('/', sendRes);

app.post('/', (req,res) =>{
    res.json({text:req.body})
})

app.get('/' , (req, res)=>{
    res.status(500).send("database not connecting");
});


app.get('/ab?cd',(req,res)=>{    //http://localhost:5000/acd
    res.send('abcd');
})    // when b is optional

app.get('/ab+cd', (req,res)=>{    //http://localhost:5000/abbbbbbbbbbbbbbbbbbbbbbbbbbbbbcd
    res.send('abcd');
}) // when we want to write b any number of times

app.get('/ab*cd', (req,res)=>{    //http://localhost:5000/abRANDOMcd
    res.send('abcd');
}) 


app.listen(5000);

///////////////////////////////////////////////////////////////////////

// if we want to check that if do we have authorisation for accessing further apis:
// url : http://localhost:5000/?auth=bdjedfrjnrktfrufce

const express = require('express');  // express passes function definition which need to be passed in app i.e app will call express 
const { send } = require('process');
const app = express();

const checkAuth = (req, res, next)=>{
    console.log("in first" , req.query);       // output will be on node console
    if(req.query.auth === 'bdjedfrjnrktfrufce') {          // using === to stringify   // we get a url's query through.. req.query()
    next();                                   // next function
    }
    else {
        res.status(400).send("should be authorised");
    }
};

app.use(checkAuth);  // whatsoever middleware would be put here it will run in all apis

// all these below are routes

const sendRes = (req, res)=>{
    res.status(200);               
    res.json(req.query);
};

app.get('/', sendRes);

app.post('/', (req,res) =>{
    res.json({text:req.body})
})

app.get('/' , (req, res)=>{
    res.status(401).send("database not connecting");  // status code for unauthorised user // when we use axios or fetch, then this 401 status code goes to .catch() of axios
                                                      //fetch('/').then().catch() // axios('/').then().catch()   // .then() handles success, .catch() handles error
});


app.get('/ab?cd',(req,res)=>{    //http://localhost:5000/acd
    res.send('abcd');
})    // when b is optional

app.get('/ab+cd', (req,res)=>{    //http://localhost:5000/abbbbbbbbbbbbbbbbbbbbbbbbbbbbbcd
    res.send('abcd');
}) // when we want to write b any number of times

app.get('/ab*cd', (req,res)=>{    //http://localhost:5000/abRANDOMcd
    res.send('abcd');
}) 


app.listen(5000);

///////////////////////////////////////////////////////////////////////////////////


///some points :from 36:40 to check till 36:47
// get http verb  sends 200 but as browser caches the data thats why 304 is being shown on the page's network tab of inspect element, whenever we reload

// issues with this thing:
