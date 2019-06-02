const PORT = 1337;

const express = require('express')
const path = require('path')
const formidableMiddleware = require('express-formidable');

express()
    .use(express.static(path.join(__dirname, '../', 'front')))
    .use(formidableMiddleware({uploadDir: 'uploads', keepExtensions: true}))
    .get('/', function(req, res){
        try{
            res.sendFile(path.join(__dirname, '../', 'front/upload.html'));
        }catch(err){res.send(err)}
    })
    .post('/upload', function(req, res){
        try{
            console.log(JSON.stringify(req.files))
            res.send(req.files);
        }catch(err){res.send(err)}
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
