import Svg from './utils/Svg';
import Canvas from "./utils/Canvas";

function ceil(value) {
    //ceil(100) => 100
    //ceil(175) => 200
    //ceil(915) => 1000
    value = Math.floor(value);
    let numOfPlaces = new String(value).length;
    let temp = value * Math.pow(0.1, numOfPlaces - 1);
    let result = Math.ceil(temp - 0.0001) * Math.pow(10, numOfPlaces - 1);
    return result;
}

function drawBarGraphBySvg(data, element = document.body) {
    let height = 300;
    let width = 400;
    // let normalColor = 'black';
    let maxValue = Math.max(...data);
    let topValue = ceil(maxValue);

    let svg = new Svg(width, height);

    let originPoint = [100, height - 10];
    let startY = 50;

    let lengthOfAxisX = width - originPoint[0];
    let offsetX = originPoint[0];

    let lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    let offsetY = startY;

    let numOfPoint = data.length;

    let splitDis = topValue / numOfPoint;               //yi - y(i-1) = splitDis;  代表y两点之间的大小
    let ratioY = Math.round(lengthOfAxisY / numOfPoint);  //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    let ratioX = Math.round(lengthOfAxisY / numOfPoint);


    svg.line([originPoint[0], startY], originPoint);
    svg.line(originPoint, [width, originPoint[1]]);


    //处理轴坐标相关
    let tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    let mapOfPointX = tempArr.map((item, index) => {     //x轴上的点
        return {
            pos: [(ratioX * (index + 1)) + offsetX, originPoint[1]],
            name: `${index + 1}月`,
        }
    });
    let mapOfPointY = tempArr.map((item, index) => {    //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - (ratioY * (index + 1))], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元",
        }
    });
    
    
    for (let itemX of mapOfPointX) {           //画出x轴上的点，并标上文字
        svg.point(itemX.pos, 2);
        let [textX, textY] = itemX.pos;
        let fontSize = 10;
        textY += fontSize + 5;
        textX -= fontSize * itemX.name.length / 2;
        svg.text([textX, textY], itemX.name, fontSize);
    }
    for (let itemY of mapOfPointY) {           //画出y轴上的点，并标上文字
        svg.point(itemY.pos, 2);
        let [textX, textY] = itemY.pos;
        let fontSize = 10;
        textY += fontSize / 2;
        textX -= fontSize * itemY.name.length;
        svg.text([textX, textY], itemY.name, fontSize);
    }

    //画出柱状图
    for (let index = 0; index < data.length; index++) {
        let pointX = mapOfPointX[index].pos[0];
        let pointY = data[index] / splitDis;
        let width = 10;
        svg.rect([pointX - width / 2, originPoint[1] - pointY * ratioY], [pointX + width / 2, originPoint[1]]);
    }
    svg.showIn(element);
}

function drawBarGraphByCanvas(data, element = document.body) {
    let height = 300;
    let width = 400;
    // let normalColor = 'black';
    let maxValue = Math.max(...data);
    let topValue = ceil(maxValue);

    let canvas = new Canvas(width, height);

    let originPoint = [100, height - 10];
    let startY = 50;

    let lengthOfAxisX = width - originPoint[0];
    let offsetX = originPoint[0];

    let lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    let offsetY = startY;

    let numOfPoint = data.length;

    let splitDis = topValue / numOfPoint;               //yi - y(i-1) = splitDis;  代表y两点之间的大小
    let ratioY = Math.round(lengthOfAxisY / numOfPoint);  //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    let ratioX = Math.round(lengthOfAxisY / numOfPoint);


    canvas.line([originPoint[0], startY], originPoint);
    canvas.line(originPoint, [width, originPoint[1]]);


    //处理轴坐标相关
    let tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    let mapOfPointX = tempArr.map((item, index) => {     //x轴上的点
        return {
            pos: [(ratioX * (index + 1)) + offsetX, originPoint[1]],
            name: `${index + 1}月`,
        }
    });
    let mapOfPointY = tempArr.map((item, index) => {    //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - (ratioY * (index + 1))], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元",
        }
    });
    
    
    for (let itemX of mapOfPointX) {           //画出x轴上的点，并标上文字
        canvas.point(itemX.pos, 2);
        let [textX, textY] = itemX.pos;
        let fontSize = 10;
        textY += fontSize + 5;
        textX -= fontSize * itemX.name.length / 2;
        canvas.text([textX, textY], itemX.name, fontSize);
    }
    for (let itemY of mapOfPointY) {           //画出y轴上的点，并标上文字
        canvas.point(itemY.pos, 2);
        let [textX, textY] = itemY.pos;
        let fontSize = 10;
        textY += fontSize / 2;
        textX -= fontSize * itemY.name.length;
        canvas.text([textX, textY], itemY.name, fontSize);
    }

    //画出柱状图
    for (let index = 0; index < data.length; index++) {
        let pointX = mapOfPointX[index].pos[0];
        let pointY = data[index] / splitDis;
        let width = 10;
        canvas.rect([pointX - width / 2, originPoint[1] - pointY * ratioY], [pointX + width / 2, originPoint[1]]);
    }
    canvas.showIn(element);
}

function drawLineGraphByCanvas(data, element = document.body) {
    let height = 300;
    let width = 400;
    // let normalColor = 'black';
    let maxValue = Math.max(...data);
    let topValue = ceil(maxValue);

    let canvas = new Canvas(width, height);

    let originPoint = [100, height - 10];
    let startY = 50;

    let lengthOfAxisX = width - originPoint[0];
    let offsetX = originPoint[0];

    let lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    let offsetY = startY;

    let numOfPoint = data.length;

    let splitDis = topValue / numOfPoint;               //yi - y(i-1) = splitDis;  代表y两点之间的大小
    let ratioY = Math.round(lengthOfAxisY / numOfPoint);  //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    let ratioX = Math.round(lengthOfAxisY / numOfPoint);


    canvas.line([originPoint[0], startY], originPoint);
    canvas.line(originPoint, [width, originPoint[1]]);


    //处理轴坐标相关
    let tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    let mapOfPointX = tempArr.map((item, index) => {     //x轴上的点
        return {
            pos: [(ratioX * (index + 1)) + offsetX, originPoint[1]],
            name: `${index + 1}月`,
        }
    });
    let mapOfPointY = tempArr.map((item, index) => {    //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - (ratioY * (index + 1))], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元",
        }
    });
    
    
    for (let itemX of mapOfPointX) {           //画出x轴上的点，并标上文字
        canvas.point(itemX.pos, 2);
        let [textX, textY] = itemX.pos;
        let fontSize = 10;
        textY += fontSize + 5;
        textX -= fontSize * itemX.name.length / 2;
        canvas.text([textX, textY], itemX.name, fontSize);
    }
    for (let itemY of mapOfPointY) {           //画出y轴上的点，并标上文字
        canvas.point(itemY.pos, 2);
        let [textX, textY] = itemY.pos;
        let fontSize = 10;
        textY += fontSize / 2;
        textX -= fontSize * itemY.name.length;
        canvas.text([textX, textY], itemY.name, fontSize);
    }

    //画出折线图
    let points = []
    for (let index = 0; index < data.length; index++) {
        let realPointX = mapOfPointX[index].pos[0];        //每一个点的X坐标
        let pointY = data[index] / splitDis;           //每点对应的单位坐标，还需要进行换算
        let realPointY = originPoint[1] - pointY * ratioY;
        points.push([realPointX, realPointY]);
    }
    let lastPoint = null;
    for(let point of points) {
        const last = points.length - 1;
        canvas.point(point, 3);
        if(lastPoint !== null) {   //非第一个
            canvas.line(lastPoint, point);
        }

        lastPoint = point;
    }
    canvas.showIn(element);
}

function drawMulLineGraphByCanvas(datas, element = document.body) {
    let height = 300;
    let width = 400;
    // let normalColor = 'black';
    let maxValues = datas.map(data => Math.max(...data));
    let maxValue = Math.max(...maxValues);
    let topValue = ceil(maxValue);

    let canvas = new Canvas(width, height);

    let originPoint = [100, height - 10];
    let startY = 50;

    let lengthOfAxisX = width - originPoint[0];
    let offsetX = originPoint[0];

    let lengthOfAxisY = originPoint[1] - startY; //y start from 0;
    let offsetY = startY;

    let numOfPoint = datas[0].length;

    let splitDis = topValue / numOfPoint;               //yi - y(i-1) = splitDis;  代表y两点之间的大小
    let ratioY = Math.round(lengthOfAxisY / numOfPoint);  //单位长度对应的屏幕上的坐标长度 y = 1 , y(real) = 1 * ratioY
    let ratioX = Math.round(lengthOfAxisY / numOfPoint);


    canvas.line([originPoint[0], startY], originPoint);
    canvas.line(originPoint, [width, originPoint[1]]);


    //处理轴坐标相关
    let tempArr = new Array(numOfPoint).fill(null); //仅仅是为了使用map，这里也可以直接使用变量data，不过那样写会很令人困惑
    let mapOfPointX = tempArr.map((item, index) => {     //x轴上的点
        return {
            pos: [(ratioX * (index + 1)) + offsetX, originPoint[1]],
            name: `${index + 1}月`,
        }
    });
    let mapOfPointY = tempArr.map((item, index) => {    //y轴上的点
        return {
            pos: [originPoint[0], originPoint[1] - (ratioY * (index + 1))], //originPoint[1]是绝对坐标已经包含偏移量
            name: Math.floor(splitDis * (index + 1)) + "元",
        }
    });
    
    
    for (let itemX of mapOfPointX) {           //画出x轴上的点，并标上文字
        canvas.point(itemX.pos, 2);
        let [textX, textY] = itemX.pos;
        let fontSize = 10;
        textY += fontSize + 5;
        textX -= fontSize * itemX.name.length / 2;
        canvas.text([textX, textY], itemX.name, fontSize);
    }
    for (let itemY of mapOfPointY) {           //画出y轴上的点，并标上文字
        canvas.point(itemY.pos, 2);
        let [textX, textY] = itemY.pos;
        let fontSize = 10;
        textY += fontSize / 2;
        textX -= fontSize * itemY.name.length;
        canvas.text([textX, textY], itemY.name, fontSize);
    }

    //画出多个折线图
    let lines = [];
    for(let lineData of datas) {
        let points = []
        for (let index = 0; index < lineData.length; index++) {
            let realPointX = mapOfPointX[index].pos[0];        //每一个点的X坐标
            let pointY = lineData[index] / splitDis;           //每点对应的单位坐标，还需要进行换算
            let realPointY = originPoint[1] - pointY * ratioY;
            points.push([realPointX, realPointY]);
        }
        lines.push(points);
    }
    
    console.log("lines", lines);
    
    for(let line of lines) {
        let lastPoint = null;
        // let helpRandomInt = () => Math.floor(Math.random() * 256);
        let lineColor = '#'+Math.floor(Math.random()*0xffffff).toString(16);
        for(let point of line) {
            const last = line.length - 1;
            canvas.point(point, 3);
            if(lastPoint !== null) {   //非第一个
                canvas.line(lastPoint, point, 2,lineColor);
            }
            lastPoint = point;
        }
    }
    canvas.showIn(element);
}

export default {
    drawBarGraphBySvg,
    drawBarGraphByCanvas,
    drawLineGraphByCanvas,
    drawMulLineGraphByCanvas,

}

function test() {
    function e(msg) {
        throw Error(msg);
    }
    ceil(100) === 100 ? '' : e(100);
    ceil(115) === 200 ? '' : e(115);
    ceil(915) === 1000 ? '' : e(915);
}