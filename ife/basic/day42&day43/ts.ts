class Restaurant {
    private cash: number;
    private seats: number;
    public staff: Staff[] = [];
    
    constructor(props: {cash: number, seats: number, staff: Staff[]}) {
        this.cash = props.cash;
        this.seats = props.seats;
        this.staff.concat(props.staff);
    }
    
    public hire(staff: Staff): void {
        this.staff.push(staff);
    }
    
    public fire(staff: Staff): boolean {
        let result = false;
        let index = this.staff.indexOf(staff);
        index > -1 ? result = true: '';
        this.staff.splice(index, 1);
        return result;
    }
}

class Staff {
    private id: number;
    private name: string;
    private payment: number;
    private static nextId: number = 0;

    constructor(name:string, payment: number) {
        this.name = name;
        this.payment = payment;
        this.id = Staff.getNextId();
    }

    private static getNextId(): number {
        return ++Staff.nextId;
    }

    getName(): string {
        return this.name;
    }

    work(): void {
        console.log("work one times");
    }
}

class Waiter extends Staff {
    constructor(name: string, payment: number) {
        super(name, payment);
    }
    work(dishes?: Dish[]): void {
        if(dishes === undefined) {
            console.log("上菜");
        } else {
            console.log("点菜 " + dishes.join("-"));
        }
    }
}

class Cook extends Staff {
    constructor(name: string, payment: number) {
        super(name, payment);
    }
    work(): void {
        console.log("做菜");
    }
}

class Dish {
    name: string;
    price: number;
    cost: number;
    constructor(name: string, price: number, cost: number) {
        this.name = name;
        this.price = price;
        this.cost = cost;
    }
}

function main(): void {
    var ifeRestaurant = new Restaurant({
        cash: 1000000,
        seats: 20,
        staff: []
    });
    
    var newCook = new Cook("Tony", 10000);
    ifeRestaurant.hire(newCook);
    
    console.log(ifeRestaurant.staff);
    
    ifeRestaurant.fire(newCook);
    console.log(ifeRestaurant.staff);
};

main();