const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./utils/cors'));
app.use(require('./controllers/login'));
// app.use(require('./utils/jwtMiddleware'));
app.use(require('./controllers/user'));
app.use(require('./controllers/admin'));
app.use((req,res,next)=>{
    res.json({"msg":"Oops You Typed Something Wrong"});
});
var arr = process.argv;
var config = require('./utils/config');
config.key = arr[2];
//console.log('Key is ',config.key);
app.listen(process.env.PORT||2012,()=>{
    console.log('Congratulations Server Started.....');
});