const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const DB = require('./config/config');

app.use(cors())

app.get('/api/host',(req,res) => {
    res.send({host : 'host'});
})

app.get('/api/USER_INFO', (req,res) => {
    DB.query("SELECT * FROM FITFEED.USER_INFO;", (err, data) => {
        if(!err){
            res.send(data);
        }
        else{
            res.send(err);
        }
    })
})

app.get('/api/REGISTER', (req,res) => {
    console.log('Sign Up : ', req.query);
    DB.query("INSERT FITFEED.USER_INFO(`id`,`passwd`,`nickname`) VALUES ('"+req.query.id+"', '"+req.query.passwd+"','"+req.query.nickname+"');", (err, data) => {
        if(!err){
            res.send(data);
        }
        else{
            if(err.code == 'ER_DUP_ENTRY'){
                res.send("Duplication ID");
            }
            else{
                res.send(err);
            }
        }
    })
})

app.get('/api/ID_CHECK',(req,res) => {
    console.log('ID_Check : ', req.query);
    DB.query("select EXISTS (select * from USER_INFO where id = '"+req.query.id+"') as success;", (err,data) => {
        if(data[0].success){
            res.send('invalid');
        }
        else{
            res.send('valid');
        }
        console.log(data[0].success);
    })

})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})