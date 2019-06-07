# object-detection-test

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This is an example project that uses a YOLOv3 model pre-trained on Coco dataset.  
The required files for object detection (namely pre-trained weight file `yolov3.weights`, YOLOv3 cfg file `yolov3.cfg` and Coco dataset class names file `coco.names`) are used from the [Darknet YOLOv3 website][yolo_website].  
The object detection part is implemented as per the guide ['YOLO object detection with OpenCV' by Adrian Rosebrock][object-detection-guide].

**The project is currently deployed at https://object-detection-test.herokuapp.com**  

## Deployment
You can simply click on the `Deploy to Heroku` button at the top to deploy the app on your heroku server.  
To manually set up the app on your Linux machine without using Heroku, follow following steps:
#### Prerequisites:
You must have Python 3 and Node.js installed
#### Set up
1. Install opencv dependencies  
    `$ sudo apt-get install libsm6 libxrender1 libfontconfig1 libice6`
2. Run required Python packages.  
    `$ pip3 install -r requirements.txt`
3. Run required Node.js packages  
    `$ npm install`
4. Run the build script  
    `$ npm run build`
5. Run the app. The default port is 1337.  
    `$ npm start`




[yolo_website]: https://pjreddie.com/darknet/yolo/
[object-detection-guide]: https://www.pyimagesearch.com/2018/11/12/yolo-object-detection-with-opencv/
