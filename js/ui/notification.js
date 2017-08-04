/**
 * Created by liuxy on 16/10/26.
 */
'use strict';
import React, { Component } from 'react';
import ReactNative,{
    StyleSheet,
    View,
} from 'react-native';

import Button from './common/component/Button';

import RNNotification from 'react-native-notification-android';

export default class NotificationDemo extends Component {
    constructor(props) {
        super(props);
        RNNotification.onNotificationClicked(()=>{
            console.log(11111111);
        });
    }

    show(message){
        RNNotification.showNotification(message);
    }

    getNum(){
        RNNotification.getApplicationIconBadgeNumber((err,num)=>{
            if (err){
                console.log(err);
                return;
            }
            console.log(num);
        });
    }

    clear(){
        RNNotification.clearNotification();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    buttonText="show"
                    submitCallback={()=>this.show("123")}></Button>
                <Button
                    buttonText="clear"
                    submitCallback={()=>this.clear()}></Button>
                <Button
                    buttonText="num"
                    submitCallback={()=>this.getNum()}></Button>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: 'black'
    },

});