import utils from './utils';


const kitchen = [0, 0];
const serveBar = [1, 100];
const table = [0, 200];

class Queue<T> {
    private name: string;
    private storage: T[] = [];
    private element: Element;
    constructor(...args: T[]) {
        this.storage.concat(this.storage);
    }

    add(item: T) {
        this.storage.push(item);
        this.freshEl();
    }
    
    offer(): T {
        let item: T = this.storage.shift();
        this.freshEl();
        return item;
        
    }

    isEmpty(): boolean {
        return this.storage.length === 0;
    }

    showIn(el: Element, name: string = 'Queue') {
        this.name = name;
        this.element = document.createElement('div');
        el.appendChild(this.element);
        this.freshEl();
    }

    freshEl() {
        if(this.element !== undefined) {
            let template = '[' + this.storage.join('<-') + ']';
            this.element.textContent = this.name + ': ' + template;
        }
    }

}
const timeRatio = 1000;

let log = (function() {
    let time = new Date();
    return function(...args) {
        let newTime = new Date();
        time = newTime;
        args.push(time.toLocaleTimeString() + ': ' + time.getSeconds());
        if(args.join('').indexOf('debug') > -1, args.join('').indexOf('while') > -1) {
            return;
        }
        return console.log(...args);
    }
})();

abstract class MapElement {
    private mapElement: Element;
    private position: [number, number];
    private __originalText: string;

    constructor() {
        this.mapElement = document.createElement('div');
        this.mapElement.classList.add('item');
        this.position =  [0, 0];
        document.querySelector('#stage').appendChild(this.mapElement);
    }

    setTextcontent(text: string) {
        this.__originalText = text;
        this.mapElement.textContent = text;
    }

    setStatus(status: string) {
        this.mapElement.textContent = this.__originalText + `(${status})`;
    }

    getPosition() {
        return this.position;
    }

    moveTo(pos: [number, number], time = 1) {
        if(pos[0] === null) {
            pos[0] = this.position[0];
        }
        if(pos[1] === null) {
            pos[1] = this.position[1];
        }

        this.position = pos;
        Promise.resolve(time)
        .then((time: number) => {
            let el = this.mapElement as any;
            el.style.transition = time + 's';
            return el;
        })
        .then((el) => {
            setTimeout(() => {
                el.style.transform = `translate(${pos[0]}px, ${pos[1]}px)`;
            }, 0);
        });
    }

    moveToServeBar(time = 1) {
        let [x, y] = serveBar;
        this.moveTo([null, y], time);
        return new Promise((resolve) => {
            setTimeout(function() {
                resolve('ok');
            }, time * timeRatio);
        });
    }
}


abstract class SuperStaff extends MapElement {
    name: string;
    payment: number;
    constructor(nm: string, p: number) {
        super();
        this.name = nm;
        this.payment = p;
        this.setTextcontent(nm);
        // this.moveTo([50, Math.floor(Math.random() * 100)], Math.floor(Math.random() * 10));    
    }
    toString(): string {
        return this.name;
    }
}

class Cook extends SuperStaff {
    
    finishedDishQueue: Queue<{dish: Dish, customer: Customer}>;
    
    constructor(name: string, payment: number) {
        super(name, payment);
        

        let [x, y] = kitchen;
        this.moveTo([x + utils.randomBetween(0, 300), y + utils.randomBetween(20, 80)]);
    }

    setFinishedDishQueue(f: Queue<{dish: Dish, customer: Customer}>) {
        this.finishedDishQueue = f;
    }

    makeDish(order: Order) {

        class FinishedDish {
            dish: Dish;
            customer: Customer;

            constructor(dish: Dish, customer: Customer) {
                this.dish = dish;
                this.customer = customer;
            }

            toString() {
                return this.customer.name + '的' + this.dish.name;
            }
        }

        let dishes = order.dishes;
        let self = this;
        let allP = [];
        for(let dish of dishes) {
            
            let p = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    console.log('做好了' + dish.name);
                    let finishedDish = new FinishedDish(dish, order.customer);
                    
                    resolve(finishedDish);
                }, dish.time * timeRatio);
            }).then(function(finishedDish: {dish: Dish, customer: Customer}) {
                log('*');
                self.finishedDishQueue.add(finishedDish);
            });

            //---纯粹动画效果
            let [x, y] = this.getPosition();
            this.moveTo([x + utils.randomBetween(-100, 50),y + utils.randomBetween(-20, 20)]);
            //---

            allP.push(p);
        }

        
        return Promise.all(allP);
    }
}

class Waiter extends SuperStaff {
    finishedDishQueue: Queue<{dish: Dish, customer: Customer}>;

    order: Order = null;
    constructor(name: string, payment: number) {
        super(name, payment);

        this.setStatus('空闲中');
        let [x, y] = serveBar;
        this.moveTo([utils.randomBetween(0, 200), y + utils.randomBetween(20, 60)]);
    }

    setFinishedDishQueue(f: Queue<{dish: Dish, customer: Customer}>) {
        this.finishedDishQueue = f;
    }

    takeOrder(order: Order) {
        //移动到顾客哪里   0.5秒的移动
        this.setStatus('为' + order.customer.name + '点菜中');
        return new Promise((resolve, reject) => {
            //0.5s移动到顾客哪里
            let customerPos = order.customer.getPosition();
            this.moveTo(customerPos, 0.5);
            setTimeout(() => {
                resolve(this);
            } , 0.5 * timeRatio);
        })
        .then((waiter: Waiter) => {
            //3s 听取顾客点菜
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.order = order;
                    resolve('ok');
                }, 3 * timeRatio);
            })
        })
    }

    writeDownOrder(orderQueue) {
        //移动到服务区
        return new Promise((resolve) => {
            this.setStatus('通知厨师上菜');
            this.moveTo([null, 150], 0.5);
            setTimeout(() => {
                orderQueue.add(this.order);
                this.order = null;
                resolve('ok');
            }, 0.5 * timeRatio);
        })
        
        
    }
}

class Staff {
    static getStaff(kind: 'cook' | 'waiter', args: [string, number]): Cook | Waiter {
        if(kind === 'cook') {
            return new Cook(args[0], args[1]);
        } else if (kind === 'waiter') {
            return new Waiter(args[0], args[1]);
        }
    }
}

class Customer extends MapElement {
    name;
    dishes: Dish[] = [];
    private __order: Order;
    constructor(name: string) {
        super();
        this.name = name;
        this.setTextcontent('顾客:' + this.name);
        let [x, y] = table;
        this.moveTo([x + utils.randomBetween(0, 300), y + utils.randomBetween(0, 300)]);
    }
    

    order(...dishName: string[]) {
        let dishes: Dish[] = [];

        for(let name of dishName) {
            dishes.push(Dish.getDish(name));
        }
        let order = new Order(this, ...dishes);
        this.__order = order;
        return this;
    };

    getOrder() {
        return this.__order;
    }

    getDish(dish: Dish) {
        const numOfOrderDishes = this.__order.dishes.length;
        Promise.resolve(dish)
        .then((dish: Dish) => {
            this.dishes.push(dish);
            return dish;
        })
        .then((dish: Dish) => {
            return new Promise((resolve, reject) => {
                console.log(this.name + '开始吃' + dish.name)
                setTimeout(function() {
                    resolve(dish);
                }, 2 * timeRatio);
            })
        })
        .then((dish: Dish) => {
            console.log(this.name + '吃完了' + dish.name);
            if(this.dishes.length === numOfOrderDishes) {
                log(this.name + '已经全部吃完了');
            }
        })
    }

    toString(): string {
        return this.name;
    }
}

class Dish {
    name: string;
    price: number;
    time: number;
    private cost: number;
    static storage = {};
    
    constructor(name: string, price: number, cost: number, time?: number) {
        this.name = name;
        this.price = price;
        this.cost = cost;
        this.time = time | 2;
    }

    static getDish = (function() {
        const cost:number = 50;
        let o1 = new Dish('蟹黄堡', 100, cost);
        let o2 = new Dish('fish', 100, cost, 10);
        let o3 = new Dish('duck', 100, cost);
        let o4 = new Dish('drink', 100, cost);
        let o5 = new Dish('cheaps', 100, cost);
        let o6 = new Dish('potato', 100, cost);
        let o7 = new Dish('meat', 100, cost);
        for(let item of [o1, o2, o3, o4, o5, o6, o7]) {
            let name = item.name;
            Dish.storage[name] = item;
        }

        return function(name: string): Dish {
            let item = Dish.storage[name];
            if(item === undefined) {
                item = new Dish(name, 199, 100);
                console.log('没有叫' + item.name + '的菜，但可以给你做 价格199');
            }
            return item;
        }
    })();
    
    toString(): string {
        return '菜' + this.name;
    }
}

class Order {
    customer: Customer;
    dishes: Dish[];
    constructor(c: Customer, ...dishes: Dish[]) {
        this.customer = c;
        this.dishes = dishes;
    }
    toString() {
        return this.customer.name + '的订单';
    }
    
}

function main() {

    
    

    let customer = new Customer('派大星');
    let customer1 = new Customer('阿银');
    let customer2 = new Customer('路飞');
    // customer.moveTo([0, 220], 0);

    let waiter = Staff.getStaff('waiter',['章鱼哥', 1000]) as Waiter;
    let waiter2 = Staff.getStaff('waiter',['佩奇', 1000]) as Waiter;
    let cook = Staff.getStaff('cook', ['海绵宝宝', 0]) as Cook;
    let cook2 = Staff.getStaff('cook', ['阿秒小姐', 9999]) as Cook;
    let cook3 = Staff.getStaff('cook', ['小当家', 0]) as Cook;

    let orderedCustomerQueue = new Queue<Customer>();
    let cookQueue = new Queue<Cook>();
    let orderQueue = new Queue<Order>();
    let freeWaiterQueue = new Queue<Waiter>();
    let finishedDishQueue = new Queue<{dish: Dish, customer: Customer}>();

    let infoEl = document.querySelector('#info');
    orderedCustomerQueue.showIn(infoEl, '正在要求点菜的顾客队列');
    cookQueue.showIn(infoEl, '空闲厨师队列');
    orderQueue.showIn(infoEl, '订单队列');
    freeWaiterQueue.showIn(infoEl, '空闲侍者队列');
    finishedDishQueue.showIn(infoEl, '已完成菜品队列');

    waiter2.setFinishedDishQueue(finishedDishQueue);
    waiter.setFinishedDishQueue(finishedDishQueue);

    cook.setFinishedDishQueue(finishedDishQueue);
    cook2.setFinishedDishQueue(finishedDishQueue);
    cook3.setFinishedDishQueue(finishedDishQueue);

    cookQueue.add(cook);
    cookQueue.add(cook2);
    cookQueue.add(cook3);
    freeWaiterQueue.add(waiter);
    freeWaiterQueue.add(waiter2);
    orderedCustomerQueue.add(customer.order('fish', 'duck'));
    orderedCustomerQueue.add(customer1.order('蛋黄酱', '蛋黄酱', '蛋黄酱', '蛋黄酱', '蛋黄酱'));
    orderedCustomerQueue.add(customer2.order('肉', '肉', '肉', '肉', '肉', '肉'));

    let nameEl = document.querySelector('#name') as any;
    let dishEl = document.querySelector('#dishes') as any;
    let btn = document.querySelector('#btn');
    btn.addEventListener('click', function() {
        let c = new Customer(nameEl.value);
        let dishes: string[] = dishEl.value.split(' ');
        c.order(...dishes);
        orderedCustomerQueue.add(c);
    });

    (function wrap(time = timeRatio) {
        setTimeout(function() {
            // log('开始运作');
        while(!freeWaiterQueue.isEmpty()) {
            log('while1')
            if(!orderedCustomerQueue.isEmpty()) {
                log('debug1')
                let waiter = freeWaiterQueue.offer();
                let customer = orderedCustomerQueue.offer();
                let order = customer.getOrder();
                log(waiter.name + '准备' + customer.name + '的点餐');

                waiter.takeOrder(order)
                .then(function(arg) {
                    //0.5 服务生通知厨师去上菜
                    waiter.writeDownOrder(orderQueue)
                    .then(function() {
                        waiter.setStatus('空闲中');
                        freeWaiterQueue.add(waiter);
                    });
                });
              
            } else {
                //没有要点菜的顾客
                log('debug2');
                if(!finishedDishQueue.isEmpty()) {    //判断是否有要上的菜
                    log('debug3')
                    let waiter = freeWaiterQueue.offer();
                    waiter.setStatus('准备上菜中');
                    let dish = finishedDishQueue.offer();                    
                    waiter.moveToServeBar(0.5)      //0.5s移动到服务台端菜
                    .then(function() {
                        let customer = dish.customer;
                        waiter.setStatus(customer.name + '的' + dish.dish.name);
                        log('cus', customer.getPosition());
                        waiter.moveTo(customer.getPosition(), 1);
                        return new Promise(function(resolve) {  //0.5s送到顾客哪里
                            setTimeout(() => {
                                resolve(dish.dish);
                            }, 1 * timeRatio);
                        })
                    })
                    .then(function(dish: Dish) {
                        log('dish', dish)
                        customer.getDish(dish);
                        waiter.setStatus('空闲中');
                        waiter.moveToServeBar()
                        freeWaiterQueue.add(waiter);                        

                    });
                } else {
                    log('debug4')
                    //没有要上的菜和要点菜的顾客
                    break;
                }
            }
        }

        while(!orderQueue.isEmpty()) {
            log('while2')
            if(!cookQueue.isEmpty()) {
                let order = orderQueue.offer();
                
                let cook = cookQueue.offer();
                cook.makeDish(order)
                .then(() => {
                    log('完成一个订单');
                    cookQueue.add(cook);
                });
            } else {
                log('没有空闲厨师');
                break;
            }
        }
            wrap();
        }, time);
    })();
}


main();
