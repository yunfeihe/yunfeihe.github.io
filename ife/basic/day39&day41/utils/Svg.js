
function Svg(width, height, overSize = 100) {
    if(arguments.length < 2) {
        throw Error('创建svg图像需要输入宽高， 防止图像溢出');
    }
    
    this.overSize = overSize;
    this.nodes = [];
    this.size = [width, height];
    
}

Svg.prototype.line = function(start, end, width=1, color='black') {
    let lineNode = `<line x1="${start[0]}" x2="${end[0]}" y1="${start[1]}" y2="${end[1]}" stroke="${color}" stroke-width="${width}"/>`
    this.nodes.push(lineNode);
}

Svg.prototype.point = function(pos, r = 5, color='black') {
    let circleNode = `<circle cx="${pos[0]}" cy="${pos[1]}" r="${r}" fill="${color}"/>`;
    this.nodes.push(circleNode);
}

Svg.prototype.text = function(pos, value, size='5', color='black') {
    let textNode = `<text x="${pos[0]}" y="${pos[1]}" fill="${color}" style="font-size:${size}px">${value}</text>    `
    this.nodes.push(textNode);
}

Svg.prototype.rect = function(leftTop, rightBottom, width = 1, color = 'black') {
    let rectNode = `<rect x="${leftTop[0]}" y="${leftTop[1]}"  
    width="${rightBottom[0] - leftTop[0]}" height="${rightBottom[1] - leftTop[1]}" 
    stroke-width="${width}"
    fill="${color}"/>`
    this.nodes.push(rectNode);
}

Svg.prototype.showIn = function(htmlElement = document.body) {
    let nodes = this.nodes.join('\n');
    let svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" style="width:${this.size[0] + this.overSize}px; height:${this.size[1] + this.overSize}px;">
    ${nodes}
    </svg>
    `
    htmlElement.innerHTML = svgHtml;
}


export default Svg;