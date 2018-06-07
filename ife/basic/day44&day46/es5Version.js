

let simpleVersionCook = (function() {
    let instance = null;

    function Cook(name, payment) {
        this.name = name;
        this.payment = payment;
    }

    return {
        name: 'simpleVersionCook',
        getInstance(name, payment) {
            if(instance === null) {
                instance = new Cook(name, payment);
            }
            return instance;
        }
    }
})(); 


let t1 = simpleVersionCook.getInstance("123", 123);

let t2 = simpleVersionCook.getInstance("aad", 56);

console.log("t1===t2", t1 === t2);