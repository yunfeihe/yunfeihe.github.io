var main = function () {
    initSlideShow();
    autoJustifyControlerPos();
    window.onresize = function(){
        autoJustifyControlerPos();
    };

};

var autoJustifyControlerPos = function(){
    var slideShow = s("#id-div-slide-show ul");
    var controlers = sa(".controler");
    log(controlers[i]);
    for(var i=0; i<controlers.length; i++){
        log(controlers[i]);
        controlers[i].style.bottom = slideShow.offsetHeight / 2 + controlers[i].offsetHeight + "px";
    }
};

var initSlideShow = function () {
    window.currentIndex = 0;
    var keyCount = s(".key-count");
    var controlers = s("#id-div-controlers");

    keyCount.addEventListener("click", function (e) {
        var target = e.target;
        log("target", target);
        if (target.classList.contains("key")) {
            window.currentIndex = parseInt(target.textContent);
            window.isSlideShowClicked = true;
            lightSlideShowByIndex(window.currentIndex % 2);
        }
    });

    controlers.addEventListener("click", function (e) {
        var target = e.target;
        log("target", target);
        if (target.classList.contains("controler")) {
            window.currentIndex += 1;
            window.isSlideShowClicked = true;
            lightSlideShowByIndex(window.currentIndex % 2);
        }
    });

    autoChangeSlideShow(3000);
};

var autoChangeSlideShow = function (time) {
    setTimeout(function () {
        window.currentIndex += 1;
        lightSlideShowByIndex(window.currentIndex % 2);
        if (window.isSlideShowClicked) {
            autoChangeSlideShow(time * 2.5);
            window.isSlideShowClicked = false;
        } else {
            autoChangeSlideShow(time);
        }
    }, time);
};

var lightSlideShowByIndex = function (index) {
    //索引从零开始
    log("light", index);
    var images = sa("#id-div-slide-show li");
    var imgs = sa("#id-div-slide-show li img");
    for (var i = 0; i < images.length; i++) {
        // images[i].style.position = "absolute";

        images[i].classList.remove("active");
    }
    // images[index].style.position = "relative";
    images[index].classList.add("active");

    //lightKeyCount
    var keys = sa(".key-count .key");
    for (i = 0; i < keys.length; i++) {
        keys[i].classList.remove("active");
    }
    keys[index].classList.add("active");
};



// main();