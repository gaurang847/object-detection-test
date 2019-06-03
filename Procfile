release: cd ml
release: mkdir yolo-coco
release: cd yolo-coco
release: curl -O -L https://raw.githubusercontent.com/pjreddie/darknet/master/cfg/yolov3.cfg
release: curl -O -L https://raw.githubusercontent.com/pjreddie/darknet/master/data/coco.names
release: wget https://pjreddie.com/media/files/yolov3.weights
release: cd ../..
web: node back/index.js