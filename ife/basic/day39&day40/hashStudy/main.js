
function main() {
    let contABC = document.querySelector('#contABC');
    let contDEF = document.querySelector('#contDEF');
    
    let ABCbtns = document.querySelectorAll('.abc');
    let DEFbtns = document.querySelectorAll('.def');
    
    function logicOfButton(targetId, srcId) {
        return function(e) {
            // let targetId = contDiv.id;
            // let srcId = e.target.id;
            let aOperation = targetId + '-' + srcId;
            if(location.hash !== '') {
                let ph = parsedHash();
                if(ph.length >= 2) {
                    location.hash = ph[1].join('-') + '*'+ aOperation;
                } else {
                    location.hash += '*'+ aOperation;
                }
            } else {
                location.hash = aOperation;
            }
        }
    }


    ABCbtns.forEach(btn => btn.onclick = logicOfButton(contABC.id, btn.id));
    DEFbtns.forEach(btn => btn.onclick = logicOfButton(contDEF.id, btn.id));

    window.onhashchange = function(hashEvent) {
        render(hashEvent);        
    }

    render();
}

function parsedHash() {
    let hashWithoutSharp = location.hash.slice(1);
    let operations = [];
    if(hashWithoutSharp !== '') {
        let ops = hashWithoutSharp.split('*');
        operations = ops.map(item => item.split('-'));
    }
    return operations;
}

function render() {
    let ph = parsedHash();
    if(ph.length !== 0) {
        for(let op of ph) {
            let [targetId, srcId] = op;
            let target = document.getElementById(targetId);
            let srcEl = document.getElementById(srcId);
            target.textContent = srcEl.textContent;
        }
    } else {
        console.log('-1');
    }
    
}

main();