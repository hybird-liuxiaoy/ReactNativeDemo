'use strict';
import React, { Component } from 'react';
import ReactNative,{
    StyleSheet,//用于创建样式
    Text,View,Image,ListView,Navigator,TouchableOpacity,ScrollView,//RN框架UI组件
    Platform,PixelRatio,//RN框架工具组件
} from 'react-native';

import helloWorld from './helloworld';
import fetchBlob from './fetchblob';
import segmentedAndroid from './segmentedAndroid';
import gesture from './gesture';
import notification from './notification';
import camera from './camera';
import svg from './svg';
import chart from './chart';
import swiper from './swiper';

export default class ApiDemos extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {name: 'Hello World', title:'Hello World', component: helloWorld},
                {name: 'FetchBlob', title:'FetchBlobDemo', component: fetchBlob},
                {name: 'SegmentedAndroid', title:'SegmentedAndroidDemo', component: segmentedAndroid},
                {name: 'Gesture', title:'GestureDemo', component: gesture},
                {name: 'SWiper', title:'SWiperDemo', component: swiper},
                {name: 'Notification', title:'NotificationDemo', component: notification},
                {name: 'Camera', title:'CameraDemo', component: camera},
                {name: 'Svg', title:'SvgDemo', component: svg},
                {name: 'Chart', title:'ChartDemo', component: chart},
            ])
        };

        if (Platform.OS === 'android') {
            ReactNative.BackHandler.addEventListener('hardwareBackPress', () => {
                if (this.props.navigator.getCurrentRoutes().length>1)
                    this.props.navigator.pop();
                else {
                    ReactNative.BackHandler.exitApp();
                }
                return true;
            });
        }
    }

    _pressButton(rowData) {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push(rowData);
        }
    }

    renderRow(rowData){
        return (
            <TouchableOpacity style={styles.row} onPress={()=>this._pressButton(rowData)}>
                <Text style={styles.rowText}>{rowData.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth:1,
        borderColor:'red',
        flexDirection:'column',
        backgroundColor: '#F5FCFF'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    row: {
        borderWidth:1/PixelRatio.get(),
        margin: 0,
    },
    rowText: {
        color:'black',
        fontSize: 14,
        textAlign: 'left'
    }
});
