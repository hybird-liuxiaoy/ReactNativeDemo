var Realm = require('realm');

const CarSchema = {
    name: 'Car',
    primaryKey: 'id',
    properties: {
        // The following property types are equivalent
        id:    'int',    // primary key
        make:  'string',
        model: {type: 'string',indexed: true},// indexed property
        miles: {type: 'int', default: 0}, // default property
    }
};
const PersonSchema = {
    name: 'Person',
    properties: {
        name:     'string',
        birthday: 'date',
        cars:     {type: 'list', objectType: 'Car'},
        picture:  {type: 'data', optional: true}, // optional property
    }
};

// Initialize a Realm with Car and Person models
let realm = new Realm({schema: [CarSchema, PersonSchema]});

realm.write(() => {
    let car = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 750,
    });

    // you can access and set all properties defined in your model
    console.log('Car type is ' + car.make + ' ' + car.model);
    car.miles = 1500;
});

realm.write(() => {
    //property can be set null or undefined
    let charlie = realm.create('Person', {
        name: 'Charlie',
        birthday: new Date(1995, 11, 25),
        car: null,
    });

    // optional property can be set null,undefined or a non-null value
    charlie.birthday = undefined;
    charlie.car = {make: 'Honda', model: 'Accord', miles: 10000};
});

class Person {
    get ageSeconds() {
        return Math.floor((Date.now() - this.birthday.getTime()));
    }
    get age() {
        return ageSeconds() / 31557600000;
    }
}

Person.schema = PersonSchema;

// Note here we are passing in the `Person` constructor
let realm = new Realm({schema: [CarSchema, Person]});

realm.write(() => {
    var nameString = person.car.name;
    person.car.miles = 1100;

    // create a new Car by setting the property to valid JSON
    person.van = {make: 'Ford', model: 'Transit'};

    // set both properties to the same car instance
    person.car = person.van;
});

let carList = person.cars;

// Add new cars to the list
realm.write(() => {
    carList.push({make: 'Honda', model: 'Accord', miles: 100});
    carList.push({make: 'Toyota', model: 'Prius', miles: 200});
});

let secondCar = carList[1].model;  // access using an array index

/**
 * Realm支持以下的一些基础类型:bool,int,float,double,string,data和date
 * bool属性映射到JavaScript中Boolean对象
 * int,float和double属性映射到JavaScript中Number对象，不过'int'和'double'会以64位进行存储但是float会以32位进行存储
 * string属性会被映射成String对象
 * data属性会被映射成ArrayBuffer对象
 * date属性会被映射成Date对象
 * */
