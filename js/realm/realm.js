'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text, View
} from 'react-native';

const Realm = require('realm');

class RealmDemo extends Component {

    render() {
        let realm = new Realm({
            schema: [{name: 'Dog', properties: {name: 'string'}}]
        });

        realm.write(() => {
            realm.create('Dog', {name: 'Rex'});
        });

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Count of Dogs in Realm: {realm.objects('Dog').length}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default RealmDemo;

// Define your models and their properties
class Car {
}

Car.schema = {
    name: 'Car',
    properties: {
        make: 'string',
        model: 'string',
        miles: 'int',
    }
};

class Person {
}

Person.schema = {
    name: 'Person',
    properties: {
        name:    {type: 'string'},
        cars:    {type: 'list', objectType: 'Car'},
        picture: {type: 'data', optional: true}, // optional property
    }
};

// Get the default Realm with support for our objects
let realm = new Realm({schema: [Car, Person]});

// Create Realm objects and write to local storage
realm.write(() => {
    let myCar = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 1000,
    });
    myCar.miles += 20; // Update a property value
});

// Query Realm for all cars with a high mileage
let cars = realm.objects('Car').filtered('miles > 1000');

// Will return a Results object with our 1 car
cars.length; // => 1

// Add another car
realm.write(() => {
    let myCar = realm.create('Car', {
        make: 'Ford',
        model: 'Focus',
        miles: 2000,
    });
});

// Query results are updated in real-time
cars.length; // => 2
