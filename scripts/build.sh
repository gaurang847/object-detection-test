mkdir uploads
mkdir output
cd ml
mkdir yolo-coco
cd yolo-coco
curl -O -L https://raw.githubusercontent.com/pjreddie/darknet/master/cfg/yolov3.cfg
curl -O -L https://raw.githubusercontent.com/pjreddie/darknet/master/data/coco.names
wget https://pjreddie.com/media/files/yolov3.weights