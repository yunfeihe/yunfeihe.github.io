var log = function(){
    console.log.apply(console, arguments);
};

var s = function(selector){
    return document.querySelector(selector);
};

var sa = function(selector){
    return document.querySelectorAll(selector);
};

// var addClass = function(obj, className){
//     obj.classList.addClass(className);
// };

