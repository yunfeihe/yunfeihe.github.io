function __main() {
function Restaurant(props) {
    this.cash = props.cash || 0;
    this.seats = props.seats || 0;
    this.staff = props.staff || [];
}

Restaurant.prototype.hire = function(staff) {
    this.staff.push(staff)
};

Restaurant.prototype.fire = function(staff) {
    this.staff.splice(this.staff.indexOf(staff), 1);
}

function Staff(name, payment) {
    this.id = this.getNextId();
    this.name = name;
    this.payment = payment;
}

Staff.prototype.getNextId = (function() {
    nextId = 0;
    return function() {
        return ++nextId;
    }
})();

Staff.prototype.work = function() {
    console.log("work one times");
}

function Waiter(name, payment) {
    Staff.call(this, name, payment);
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constuctor = Waiter;

Waiter.prototype.work = function(menu) {
    if(menu === undefined) {
        console.log("上菜");
    } else {
        console.log("点菜 ", menu.join("-"));
    }
};

function Cook(name, payment) {
    Staff.call(this, name, payment);
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constuctor = Cook;

Cook.prototype.work = function() {
    console.log("做菜");
};

function Customer(name) {
    this.name = name;
}

Customer.prototype.order = function(waiter, ...dishes) {
    waiter.work(dishes);
};

function Dish(name, price, cost) {
    this.name = name;
    this.price = price;
    this.cost = cost;
}

}

__main();




