const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const DB = require('./config/config');

app.get('/api/host',(req,res) => {
    res.send({host : 'host'});
})

app.get('/api/USER_INFO', (req,res) =>{
    DB.query("SELECT * FROM FITFEED.USER_INFO;", (err, data) => {
        if(!err){
            res.send(data);
        }
        else{
            res.send(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})