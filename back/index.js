const PORT = 1338;

const express = require('express')
const path = require('path')
const formidableMiddleware = require('express-formidable');
const spawn = require('child_process').spawn;

const PYTHON_SCRIPT_PATH = path.join(__dirname, '..', 'ml', 'script.py');
const FRONT_PATH = path.join(__dirname, '..', 'front');
const FRONT_INDEX_PATH = path.join(FRONT_PATH, 'upload.html');
const UPLOAD_FORM_FIELD_NAME = 'the_image';

express()
    .use(express.static(FRONT_PATH))
    .set('views', path.join(FRONT_PATH, 'views'))
    .set('view engine', 'ejs')
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
            let filename = path.basename(req.files[UPLOAD_FORM_FIELD_NAME].path);
            let process = spawn('python3', [PYTHON_SCRIPT_PATH, '--image', filename]);

            process.stdout.on('data', data => {
                console.log(JSON.parse(data.toString()));
                data.success = true;
                res.render('result', {data})
            })

            process.stderr.on('data', data => {
                console.log(data.toString());
                res.statusCode = 500;
                res.render('result', {data})
            });

            //res.send(req.files);
        }catch(err){res.send(err)}
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
