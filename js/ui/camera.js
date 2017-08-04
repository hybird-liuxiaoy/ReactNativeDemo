/**
 * Created by liuxy on 26/12/2016.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import BarcodeScanner from 'react-native-barcode-scanner-universal'

export default class CameraDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    parseData(a){
        console.log(a);
    }

    render(){
        return (
            <BarcodeScanner
                onBarCodeRead={  this.parseData.bind(this)  }
                style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                </View>
            </BarcodeScanner>
        );
    }
};

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    }
});