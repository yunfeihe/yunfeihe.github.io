
function Canvas(width, height, overSize = 100) {
    this.element = document.createElement("canvas");
    this.context = this.element.getContext('2d');
    this.element.width = width + overSize;
    this.element.height = height + overSize;
    

}

Canvas.prototype.line = function(start, end, width=1, color='black') {
    this.context.strokeStyle = color;
    this.context.lineWidth = width;
    this.context.beginPath();
    this.context.moveTo(...start);
    this.context.lineTo(...end);
    this.context.stroke()
    // this.fill();
    this.context.closePath();

}

Canvas.prototype.point = function(pos, r = 5, color='black') {
    let [x, y] = pos;
    this.context.fillStyle = color;
    this.context.arc(x, y, r, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();

}

Canvas.prototype.text = function(pos, value, size='5', color='black') {
    this.context.font = size + 'px Georgia';
    this.context.strokeText(value, ...pos);
}

Canvas.prototype.rect = function(leftTop, rightBottom, width = 1, color = 'black') {
    this.context.fillStyle = color;
    let [ltx, lty] = leftTop;
    let [rbx, rby] = rightBottom;
    let [rectWidth, rectHeight] = [rbx - ltx, rby - lty];

    this.context.fillRect(ltx, lty, rectWidth, rectHeight);
}

Canvas.prototype.showIn = function(htmlElement = document.body) {
    // let nodes = this.nodes.join('\n');
    // let svgHtml = `
    // <svg xmlns="http://www.w3.org/2000/svg" style="width:${this.size[0] + this.overSize}px; height:${this.size[1] + this.overSize}px;">
    // ${nodes}
    // </svg>
    // `
    htmlElement.innerHTML = '';
    htmlElement.appendChild(this.element);
}

export default Canvas;