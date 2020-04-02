class Car{
    constructor(brand, colour, tyres){
        this.brand = brand;
        this.colour = colour;
        this.tyres = tyres;
    }
    getTyres(){
        return `This ${this.colour} ${this.brand} has ${this.tyres} tyres`;
    }
}

let myCar = new Car('Honda',"Red", 76);
console.log(myCar.getTyres()) //This Red Honda has 76 tyres
