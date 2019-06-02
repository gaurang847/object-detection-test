const PORT = 1338;

const express = require('express')
const path = require('path')
const formidableMiddleware = require('express-formidable');
const spawn = require('child_process').spawn;

const PYTHON_SCRIPT_PATH = path.join(__dirname, '..', 'ml', 'script.py');
const FRONT_PATH = path.join(__dirname, '..', 'front');
const FRONT_INDEX_PATH = path.join(FRONT_PATH, 'upload.html');

express()
    .use(express.static(FRONT_PATH))
    .use(formidableMiddleware({
        uploadDir: 'uploads',
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024        //5 MB = 5 * 1024 * 1024 Bytes
    }))
    .get('/', function(req, res){
        try{
            res.sendFile(FRONT_INDEX_PATH);
        }catch(err){res.send(err)}
    })
    .post('/upload', function(req, res){
        try{
            console.log(JSON.stringify(req.files))

            spawn('python3', [PYTHON_SCRIPT_PATH, 'First', 'Last'])
                .stdout.on('data', data => {
                    console.log(data.toString())
                    res.send(data.toString())
                })

            //res.send(req.files);
        }catch(err){res.send(err)}
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
