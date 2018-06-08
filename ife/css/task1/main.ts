function log() {
    return console.log(...arguments);
}

function main() {
    let targetEl = document.querySelector("#target");
    let btn = document.querySelector("#btn");

    btn.addEventListener("click", function(e) {
        console.log("click");
        let t = targetEl;
        let key = 'styled';
        if(t.classList.contains(key)) {
            t.classList.remove(key);
        } else {
            t.classList.add(key);
        }

    });

}

main();