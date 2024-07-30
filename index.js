const express = require('express')
const app = express()
const port = 8001;
require('./config/mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'))

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})