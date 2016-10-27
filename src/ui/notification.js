/**
 * Created by liuxy on 16/10/26.
 */
import React, { Component } from 'react';
import ReactNative,{
    StyleSheet,
    View,
    NativeModules
} from 'react-native';

import Button from './common/component/Button';

const NotificationAndroid = NativeModules.RNNotificationAndroid;

export default class NotificationDemo extends Component {
    constructor(props) {
        super(props);
        console.log(NotificationAndroid);
    }

    show(message){
        NotificationAndroid.showNotification(message);
    }

    getNum(){
        NotificationAndroid.getApplicationIconBadgeNumber((err,num)=>{
            if (err){
                console.log(err);
                return;
            }
            console.log(num);
        });
    }

    clear(){
        NotificationAndroid.clearNotification();
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth:1,
        borderColor:'red',
        flexDirection:'column',
        backgroundColor: 'black'
    },

});