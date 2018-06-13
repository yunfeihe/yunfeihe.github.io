"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = require("./utils");
var kitchen = [0, 0];
var serveBar = [1, 100];
var table = [0, 200];
var Queue = /** @class */ (function () {
    function Queue() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.storage = [];
        this.storage.concat(this.storage);
    }
    Queue.prototype.add = function (item) {
        this.storage.push(item);
        this.freshEl();
    };
    Queue.prototype.offer = function () {
        var item = this.storage.shift();
        this.freshEl();
        return item;
    };
    Queue.prototype.isEmpty = function () {
        return this.storage.length === 0;
    };
    Queue.prototype.showIn = function (el, name) {
        if (name === void 0) { name = 'Queue'; }
        this.name = name;
        this.element = document.createElement('div');
        el.appendChild(this.element);
        this.freshEl();
    };
    Queue.prototype.freshEl = function () {
        if (this.element !== undefined) {
            var template = '[' + this.storage.join('<-') + ']';
            this.element.textContent = this.name + ': ' + template;
        }
    };
    return Queue;
}());
var timeRatio = 1000;
var log = (function () {
    var time = new Date();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var newTime = new Date();
        time = newTime;
        args.push(time.toLocaleTimeString() + ': ' + time.getSeconds());
        return console.log.apply(console, args);
    };
})();
var MapElement = /** @class */ (function () {
    function MapElement() {
        this.mapElement = document.createElement('div');
        this.mapElement.classList.add('item');
        this.position = [0, 0];
        document.querySelector('#stage').appendChild(this.mapElement);
    }
    MapElement.prototype.setTextcontent = function (text) {
        this.__originalText = text;
        this.mapElement.textContent = text;
    };
    MapElement.prototype.setStatus = function (status) {
        this.mapElement.textContent = this.__originalText + ("(" + status + ")");
    };
    MapElement.prototype.getPosition = function () {
        return this.position;
    };
    MapElement.prototype.moveTo = function (pos, time) {
        var _this = this;
        if (time === void 0) { time = 1; }
        if (pos[0] === null) {
            pos[0] = this.position[0];
        }
        if (pos[1] === null) {
            pos[1] = this.position[1];
        }
        this.position = pos;
        Promise.resolve(time)
            .then(function (time) {
            var el = _this.mapElement;
            el.style.transition = time + 's';
            return el;
        })
            .then(function (el) {
            setTimeout(function () {
                el.style.transform = "translate(" + pos[0] + "px, " + pos[1] + "px)";
            }, 0);
        });
    };
    MapElement.prototype.moveToServeBar = function (time) {
        if (time === void 0) { time = 1; }
        var x = serveBar[0], y = serveBar[1];
        this.moveTo([null, y], time);
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve('ok');
            }, time * timeRatio);
        });
    };
    return MapElement;
}());
var SuperStaff = /** @class */ (function (_super) {
    __extends(SuperStaff, _super);
    function SuperStaff(nm, p) {
        var _this = _super.call(this) || this;
        _this.name = nm;
        _this.payment = p;
        _this.setTextcontent(nm);
        return _this;
        // this.moveTo([50, Math.floor(Math.random() * 100)], Math.floor(Math.random() * 10));    
    }
    SuperStaff.prototype.toString = function () {
        return this.name;
    };
    return SuperStaff;
}(MapElement));
var Cook = /** @class */ (function (_super) {
    __extends(Cook, _super);
    function Cook(name, payment) {
        var _this = _super.call(this, name, payment) || this;
        var x = kitchen[0], y = kitchen[1];
        _this.moveTo([x + utils_1["default"].randomBetween(0, 200), y + utils_1["default"].randomBetween(20, 80)]);
        return _this;
    }
    Cook.prototype.setFinishedDishQueue = function (f) {
        this.finishedDishQueue = f;
    };
    Cook.prototype.makeDish = function (order) {
        var FinishedDish = /** @class */ (function () {
            function FinishedDish(dish, customer) {
                this.dish = dish;
                this.customer = customer;
            }
            FinishedDish.prototype.toString = function () {
                return this.customer.name + '的' + this.dish.name;
            };
            return FinishedDish;
        }());
        var dishes = order.dishes;
        var self = this;
        var allP = [];
        var _loop_1 = function (dish) {
            log('*');
            var p = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log('做好了' + dish.name);
                    var finishedDish = new FinishedDish(dish, order.customer);
                    resolve(finishedDish);
                }, dish.time * timeRatio);
            }).then(function (finishedDish) {
                self.finishedDishQueue.add(finishedDish);
            });
            allP.push(p);
        };
        for (var _i = 0, dishes_1 = dishes; _i < dishes_1.length; _i++) {
            var dish = dishes_1[_i];
            _loop_1(dish);
        }
        return Promise.all(allP);
    };
    return Cook;
}(SuperStaff));
var Waiter = /** @class */ (function (_super) {
    __extends(Waiter, _super);
    function Waiter(name, payment) {
        var _this = _super.call(this, name, payment) || this;
        _this.order = null;
        var x = serveBar[0], y = serveBar[1];
        _this.moveTo([utils_1["default"].randomBetween(0, 200), y + utils_1["default"].randomBetween(20, 60)]);
        return _this;
    }
    Waiter.prototype.setFinishedDishQueue = function (f) {
        this.finishedDishQueue = f;
    };
    Waiter.prototype.takeOrder = function (order) {
        var _this = this;
        //移动到顾客哪里   0.5秒的移动
        this.setStatus('为' + order.customer.name + '点菜中');
        return new Promise(function (resolve, reject) {
            //0.5s移动到顾客哪里
            var customerPos = order.customer.getPosition();
            _this.moveTo(customerPos, 0.5);
            setTimeout(function () {
                resolve(_this);
            }, 0.5 * timeRatio);
        })
            .then(function (waiter) {
            //3s 听取顾客点菜
            return new Promise(function (resolve) {
                setTimeout(function () {
                    _this.order = order;
                    resolve('ok');
                }, 3 * timeRatio);
            });
        });
    };
    Waiter.prototype.writeDownOrder = function (orderQueue) {
        var _this = this;
        //移动到服务区
        new Promise(function (resolve) {
            _this.setStatus('通知厨师上菜');
            _this.moveTo([null, 150], 0.5);
            setTimeout(function () {
                orderQueue.add(_this.order);
                _this.order = null;
                resolve('ok');
            }, 0.5 * timeRatio);
        });
    };
    return Waiter;
}(SuperStaff));
var Staff = /** @class */ (function () {
    function Staff() {
    }
    Staff.getStaff = function (kind, args) {
        if (kind === 'cook') {
            return new Cook(args[0], args[1]);
        }
        else if (kind === 'waiter') {
            return new Waiter(args[0], args[1]);
        }
    };
    return Staff;
}());
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer(name) {
        var _this = _super.call(this) || this;
        _this.dishes = [];
        _this.name = name;
        _this.setTextcontent('顾客:' + _this.name);
        var x = table[0], y = table[1];
        _this.moveTo([x + utils_1["default"].randomBetween(0, 300), y + utils_1["default"].randomBetween(0, 300)]);
        return _this;
    }
    Customer.prototype.order = function () {
        var dishName = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dishName[_i] = arguments[_i];
        }
        var dishes = [];
        for (var _a = 0, dishName_1 = dishName; _a < dishName_1.length; _a++) {
            var name_1 = dishName_1[_a];
            dishes.push(Dish.getDish(name_1));
        }
        var order = new (Order.bind.apply(Order, [void 0, this].concat(dishes)))();
        this.__order = order;
        return this;
    };
    ;
    Customer.prototype.getOrder = function () {
        return this.__order;
    };
    Customer.prototype.getDish = function (dish) {
        var _this = this;
        var numOfOrderDishes = this.__order.dishes.length;
        Promise.resolve(dish)
            .then(function (dish) {
            _this.dishes.push(dish);
            return dish;
        })
            .then(function (dish) {
            return new Promise(function (resolve, reject) {
                console.log(_this.name + '开始吃' + dish.name);
                setTimeout(function () {
                    resolve(dish);
                }, 2 * timeRatio);
            });
        })
            .then(function (dish) {
            console.log(_this.name + '吃完了' + dish.name);
            if (_this.dishes.length === numOfOrderDishes) {
                log(_this.name + '已经全部吃完了');
            }
        });
    };
    Customer.prototype.toString = function () {
        return this.name;
    };
    return Customer;
}(MapElement));
var Dish = /** @class */ (function () {
    function Dish(name, price, cost, time) {
        this.name = name;
        this.price = price;
        this.cost = cost;
        this.time = time | 2;
    }
    Dish.prototype.toString = function () {
        return '菜' + this.name;
    };
    Dish.storage = {};
    Dish.getDish = (function () {
        var cost = 50;
        var o1 = new Dish('蟹黄堡', 100, cost);
        var o2 = new Dish('fish', 100, cost, 10);
        var o3 = new Dish('duck', 100, cost);
        var o4 = new Dish('drink', 100, cost);
        var o5 = new Dish('cheaps', 100, cost);
        var o6 = new Dish('potato', 100, cost);
        for (var _i = 0, _a = [o1, o2, o3, o4, o5, o6]; _i < _a.length; _i++) {
            var item = _a[_i];
            var name_2 = item.name;
            Dish.storage[name_2] = item;
        }
        return function (name) {
            var item = Dish.storage[name];
            if (item === undefined) {
                item = new Dish(name, 199, 100);
                console.log('没有叫' + item.name + '的菜，但可以给你做 价格199');
            }
            return item;
        };
    })();
    return Dish;
}());
var Order = /** @class */ (function () {
    function Order(c) {
        var dishes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            dishes[_i - 1] = arguments[_i];
        }
        this.customer = c;
        this.dishes = dishes;
    }
    Order.prototype.toString = function () {
        return this.customer.name + '的订单';
    };
    return Order;
}());
function main() {
    var customer = new Customer('派大星');
    customer.moveTo([0, 220], 0);
    var waiter = Staff.getStaff('waiter', ['章鱼哥', 1000]);
    var waiter2 = Staff.getStaff('waiter', ['佩奇', 1000]);
    var cook = Staff.getStaff('cook', ['海绵宝宝', 0]);
    var orderedCustomerQueue = new Queue();
    var cookQueue = new Queue();
    var orderQueue = new Queue();
    var freeWaiterQueue = new Queue();
    var finishedDishQueue = new Queue();
    var infoEl = document.querySelector('#info');
    orderedCustomerQueue.showIn(infoEl, '正在要求点菜的顾客队列');
    cookQueue.showIn(infoEl, '空闲厨师队列');
    orderQueue.showIn(infoEl, '订单队列');
    freeWaiterQueue.showIn(infoEl, '空闲侍者队列');
    finishedDishQueue.showIn(infoEl, '已完成菜品队列');
    waiter2.setFinishedDishQueue(finishedDishQueue);
    waiter.setFinishedDishQueue(finishedDishQueue);
    cook.setFinishedDishQueue(finishedDishQueue);
    cookQueue.add(cook);
    freeWaiterQueue.add(waiter);
    freeWaiterQueue.add(waiter2);
    orderedCustomerQueue.add(customer.order('fish', 'duck'));
    var nameEl = document.querySelector('#name');
    var dishEl = document.querySelector('#dishes');
    var btn = document.querySelector('#btn');
    btn.addEventListener('click', function () {
        var c = new Customer(nameEl.value);
        var dishes = dishEl.value.split(' ');
        c.order.apply(c, dishes);
        orderedCustomerQueue.add(c);
    });
    (function wrap(time) {
        if (time === void 0) { time = timeRatio; }
        setTimeout(function () {
            var _loop_2 = function () {
                if (!orderedCustomerQueue.isEmpty()) {
                    var waiter_1 = freeWaiterQueue.offer();
                    var customer_1 = orderedCustomerQueue.offer();
                    var order = customer_1.getOrder();
                    log(waiter_1.name + '准备' + customer_1.name + '的点餐');
                    waiter_1.takeOrder(order)
                        .then(function (arg) {
                        //0.5 服务生通知厨师去上菜
                        waiter_1.writeDownOrder(orderQueue);
                    });
                }
                else {
                    //没有要点菜的顾客
                    if (!finishedDishQueue.isEmpty()) { //判断是否有要上的菜
                        var waiter_2 = freeWaiterQueue.offer();
                        waiter_2.setStatus('准备上菜中');
                        waiter_2.moveToServeBar(0.5) //0.5s移动到服务台端菜
                            .then(function () {
                            var dish = finishedDishQueue.offer();
                            var customer = dish.customer;
                            waiter_2.setStatus(customer.name + '的' + dish.dish.name);
                            waiter_2.moveTo(customer.getPosition(), 0.5);
                            return new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve(dish.dish);
                                }, 0.5);
                            });
                        })
                            .then(function (dish) {
                            customer.getDish(dish);
                        });
                        freeWaiterQueue.add(waiter_2);
                    }
                    else {
                        return "break";
                    }
                }
            };
            // log('开始运作');
            while (!freeWaiterQueue.isEmpty()) {
                var state_1 = _loop_2();
                if (state_1 === "break")
                    break;
            }
            var _loop_3 = function () {
                if (!cookQueue.isEmpty()) {
                    var order = orderQueue.offer();
                    var cook_1 = cookQueue.offer();
                    cook_1.makeDish(order)
                        .then(function () {
                        log('完成一个订单');
                        cookQueue.add(cook_1);
                    });
                }
                else {
                    log('没有空闲厨师');
                    return "break";
                }
            };
            while (!orderQueue.isEmpty()) {
                var state_2 = _loop_3();
                if (state_2 === "break")
                    break;
            }
            wrap();
        }, time);
    })();
}
main();
