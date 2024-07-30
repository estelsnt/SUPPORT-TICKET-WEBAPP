const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config.json');

const port = config.PORT;
const app = express();
app.use(cors({
    origin: [
        'http://localhost:5173'
    ]
}));

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.json());

app.get(`/`, (req, res)=>{
    res.send('secret backend very secured');
});

const userRoute = require('./src/routes/users');
app.use(`/users`, userRoute);

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});