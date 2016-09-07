/**
 * Created by liuxy on 16/9/6.
 */
import React, { Component } from 'react';
import ReactNative,{
    AppRegistry,//用于注册组件
    StyleSheet,//用于创建样式
    Text,View,Image,ListView,Navigator,TouchableOpacity,ScrollView,
    Platform,PixelRatio
} from 'react-native';

import hellowworld from './hellowworld'

export default class ApiDemos extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {name: 'Hello World', title:'Hello World', component: hellowworld},
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
        fontSize: 20,//字体号
        fontWeight: 'bold',//字体粗体
        textAlign: 'left'
    },
    row: {
        borderWidth:1/PixelRatio.get(),//get获取高清设备的像素比,最小线宽:1/PixelRatio.get()
        margin: 0,
    },
    rowText: {
        color:'black',
        fontSize: 14,//字体号
        textAlign: 'left'
    }
});