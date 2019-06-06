const PORT = process.env.PORT || 1337;

const express = require('express')
const path = require('path')
const formidableMiddleware = require('express-formidable');
const spawn = require('child_process').spawn;

const PYTHON_SCRIPT_PATH = path.join(__dirname, '..', 'ml', 'script.py');
const FRONT_PATH = path.join(__dirname, '..', 'front');
const OUTPUT_PATH = path.join(__dirname, '..', 'output');
const FRONT_INDEX_PATH = path.join(FRONT_PATH, 'upload.html');
const UPLOAD_FORM_FIELD_NAME = 'the_image';

express()
    .use(express.static(FRONT_PATH))
    .use(express.static(OUTPUT_PATH))
    .set('views', path.join(FRONT_PATH, 'views'))
    .set('view engine', 'ejs')
    .use(formidableMiddleware({
        uploadDir: 'uploads',
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024        //5 MB = 5 * 1024 * 1024 Bytes
    }, [{
        event: 'error',
        action: function (req, res, next, name, file) {
            console.error({name, file});
            let message = {'message': 'File Upload Error', 'success': false};
            res.render('result', {data: message});
        }
    }]))
    .get('/', function(req, res){
        try{
            res.sendFile(FRONT_INDEX_PATH);
        }catch(err){res.send(err)}
    })
    .post('/upload', function(req, res){
        try{
            let filename = path.basename(req.files[UPLOAD_FORM_FIELD_NAME].path);
            
            if(req.files[UPLOAD_FORM_FIELD_NAME].size <= 0){
                let data = {success: false, message: 'File Upload Error'};
                return res.render('result', {data})
            }

            let process = spawn('python3', [PYTHON_SCRIPT_PATH, '--image', filename]);

            process.stdout.on('data', data => {
                let newData = JSON.parse(data.toString());
                newData.success = true;
                newData.meta = {
                    "filetype": req.files[UPLOAD_FORM_FIELD_NAME].type,
                    "sizeInBytes": req.files[UPLOAD_FORM_FIELD_NAME].size,
                    "filename": filename
                }

                console.log(newData);
                res.render('result', {data: newData});
            })

            process.stderr.on('data', data => {
                console.error(data.toString())
                let message = {'message': 'Yolo script error', 'success': false};
                res.render('result', {data: message});
            });

            //res.send(req.files);
        }catch(err){res.send(err)}
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
