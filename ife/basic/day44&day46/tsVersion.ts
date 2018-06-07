


class Cook {
    name: string;
    payment: number;
    order: {name: string, price: number};
    private static instance: Cook = null;
    private constructor(name, payment) {
        this.name = name;
        this.payment = payment;
    }

    static getInstance(name: string, payment:number) {
        if(!Cook.instance) {
            Cook.instance = new Cook(name, payment);
        } 
        return Cook.instance;
    }

    startCook(order: {name: string, price: number}, waiter: Waiter) {
        console.log(this.name + '已经开始做' + order.name + '了');
        console.log('------waiting------');
        console.log('菜已经做好了，通知' + waiter.name + '去上菜');
        this.order = order;
        this.notifyWaiterToServe(waiter);
    }

    notifyWaiterToServe(waiter: Waiter) {
        waiter.startToServeDishes(this.order);

    }
}

class Waiter {
    name: string;
    payment: number;
    orderBy: Customer;
    order: {name: string, price: number};
    private static instance: Waiter;
    private constructor(name, payment) {
        this.name = name;
        this.payment = payment;
    }

    static getInstance(name: string, payment:number) {
        if(!Waiter.instance) {
            Waiter.instance = new Waiter(name, payment);
        }
        return Waiter.instance;
    }

    takeOrderBy(order: {name: string, price: number}, who: Customer) {
        this.orderBy = who;
        this.order = order;
    }

    notifyCookToCook(cook: Cook) {
        cook.startCook(this.order, this);
    }

    startToServeDishes(order: {name: string, price: number}) {
        console.log("给" + this.orderBy.name + '上' + order.name);
        this.orderBy.notifyOk();
    }

}

class Seat {
    private __customer: Customer;
    private static instance: Seat;
    private constructor(customer: Customer) {
        this.__customer = customer;
    }

    static getInstance(customer: Customer = null) {
        if(!Seat.instance) {
            Seat.instance = new Seat(customer);
        } 
        return Seat.instance;

    }

    getCustomer(): Customer {
        return this.__customer;
    }

    setCustomer(customer: Customer) {
        if(this.__customer !== null && customer !== null) {
            console.log("已经有人了");
        } else {
            this.__customer = customer;
        }
    }

    
}

class Customer {
    name: string;
    seat: Seat = null;
    private static instance: Customer = null;
    constructor(name) {
        this.name = name;
    }


    takeSeat(seat: Seat) {
        this.seat = seat;
        seat.setCustomer(this);
    }

    toString() {
        return this.name;
    }

    outSeat() {
        if(this.seat === null) {
            console.log("你还没有入座");
        } else {
            this.seat.setCustomer(null);
        }
    }

    orderToWaiter(waiter: Waiter, order: {name: string, price: number}) {
        waiter.takeOrderBy(order, this);
    }

    notifyOk() {
        console.log(this.name + '正在吃饭');
        console.log('吃完了');
        this.outSeat();
    }
}

class Menu {
    private static instance: Menu;
    private static dishes = {
        'fish': 100,
        'meat': 100,
        'drink': 10,
        'duck': 100,
    }
    private constructor() {
    }

    static getInstance() {
        if(!Menu.instance) {
            Menu.instance = new Menu();
        }
        return Menu.instance;
        
    }

    order(name):{name: string, price: number} {
        if(name in Menu.dishes) {
            return {
                name: name,
                price: Menu.dishes[name],
            }
        } else {
            console.log("没有叫" + name +"的菜，可以帮你做，但定价一律200");
            return {
                name: name,
                price: 200,
            }
        }
    }
}

class Queue<T> {
    private stor: T[];
    constructor(...customeres: T[]) {
        this.stor = [].concat(customeres);
    }

    add(item: T) {
        this.stor.push(item);
    }

    offer() {
        return this.stor.shift();
    }

    isEmpty(): boolean {
        return this.stor.length === 0;
    }

    toString(): string {
        return '[' + this.stor.join('-') + ']';
    }
}

function main() {
    let cook = Cook.getInstance('海绵宝宝', 0);
    let waiter = Waiter.getInstance('章鱼哥', 1000);
    let customer = new Customer('派大星');
    let customerQueue = new Queue<Customer>();
    let dishName = 'fish';
    console.log(cook, waiter, customer, customerQueue)
    customerQueue.add(customer);
    

    window.setInterval(function() {
        console.log("新的一轮");
        console.log('当前剩余顾客', customerQueue.toString());

        if(customerQueue.isEmpty()) {
            console.log('当前没有顾客');
        } else {
            let cus: Customer = customerQueue.offer();
            console.log("服务顾客：", cus.name);
            cus.takeSeat(Seat.getInstance());
            let order = Menu.getInstance().order(dishName);
            cus.orderToWaiter(waiter, order);
            waiter.notifyCookToCook(cook);
        }
    }, 2000);


    let nameEl:any = document.querySelector("#name");
    let dishEl: any = document.querySelector("#dish");
    document.querySelector("#order").addEventListener('click', function() {
        let name = nameEl.value;
        let dish = dishEl.value;
        let c = new Customer(name);
        dishName = dishEl.value;
        customerQueue.add(c);
        console.log(c.name + '来了');
    });

    

}

main();
