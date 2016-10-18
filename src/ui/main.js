/**
 * Created by liuxy on 16/9/6.
 */
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
            ])
        };

        if (Platform.OS === 'android') {
            ReactNative.BackAndroid.addEventListener('hardwareBackPress', () => {
                if (this.props.navigator.getCurrentRoutes().length>1)
                    this.props.navigator.pop();
                else {
                    ReactNative.BackAndroid.exitApp();
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
}
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