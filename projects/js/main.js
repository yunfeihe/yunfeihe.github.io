var log = function(){
    console.log.apply(console, arguments);
};
var s = function(selector){
    return document.querySelectorAll(selector);
};

var toggleClass = function(obj, className){
    var notFounded = -1;
    var classes = obj.className.split(" ");
    var index = classes.indexOf(className);
    if(index !== notFounded){
        classes.splice(index, 1);
    } else {
        classes.push(className);
    }
    obj.className = classes.join(" ");
};

var addClass = function(obj, className){
    obj.className += " " + className;
}

var clickShow = function(){
    var wrap = s(".wrap")[0];
    wrap.addEventListener("click", function(e){
        log("click", e.target);
        if(e.target.className.includes("title")){
            addClass(e.target.parentElement, "show");
        }
    });
};

var autoScale = function(){
    var wrap = s(".wrap")[0];
    var titlesNodes = s(".title");
    var titles = [];
    for(var i=0; i<titlesNodes.length; i++){
        titles.push(titlesNodes[i]);
    }
    window.addEventListener("mousemove", function(e){
        // log(e);
        var target = e.target;
        var targetIndex;
        for (let i = 0; i < titles.length; i++) {
            var node = titles[i];
            node.style.fontSize = "23px";
            if(target === node){
                targetIndex = i;
            }
        }
        if(targetIndex > -1){
            targetIndex > 0 ? titles[targetIndex - 1].style.fontSize = "27px" : log("index out of range 0", targetIndex);
            targetIndex < titles.length - 1 ? titles[targetIndex + 1].style.fontSize = "27px" : log("index out of range max");
            target.style.fontSize = "35px";
        }

    });
};

var main = function(){
    // clickShow();
    autoScale();
};

main();