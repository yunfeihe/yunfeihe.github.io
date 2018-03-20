var displayShowItemByIndex = function (index) {
    var showItems = sa(".typical-cases .wrap .item");
    for (var i = 0; i < showItems.length; i++) {
        showItems[i].classList.remove("active");
    }
    showItems[index].classList.add("active");
}

var nextShowItem = function () {
    log("next");
    var counts = sa(".typical-cases .wrap .item").length;
    window.currentTimeOut = setTimeout(function () {
        window.currentShowIndex += 1;
        displayShowItemByIndex(window.currentShowIndex % counts);
        nextShowItem();
    }, 4000);
};