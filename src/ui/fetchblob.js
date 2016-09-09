/**
 * Created by liuxy on 16/9/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    Platform,
    SegmentedControlIOS,
    TextInput,
    View
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob'
// import bson from 'bson/browser_build/bson'
import {BSON,Long, ObjectID,Binary,Code,DBRef,Symbol,Double,Timestamp,MaxKey,MinKey} from 'bson'
import {Buffer} from 'buffer'

export default class FetchDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
        this.onPress();
    }
    
    onPress(){
        let userinfo = {
            username: "13801234567",
            password: "123456",
            TerminalID:"1"
        };
        // var BSON = bson().BSON;
        // var data = BSON.serialize(userinfo, false, true, false);
        var bson = new BSON([Long, ObjectID, Binary, Code, DBRef, Symbol, Double, Timestamp, MaxKey, MinKey])
        var data = bson.serialize(userinfo,false,true,false)
        // console.log('data:', data.toString());
        // console.log(bson.deserialize(data));
        // console.log(RNFetchBlob.base64.encode(data.toString()));
        // console.log(RNFetchBlob.base64.decode(RNFetchBlob.base64.encode(data)));

        let url='http://192.168.1.7:9000/login';
        RNFetchBlob.fetch("POST",url, {
                    'Accept': 'application/octet-stream',
                    'Content-Type': 'application/octet-stream',
                },RNFetchBlob.base64.encode(data))
            .then((response) => {
                var json = bson.deserialize(new Buffer(response.data,'base64'));
                console.log(json);
            });
    }

    render() {

        return (
            <View style={{backgroundColor:'grey',flex:1}}>
                <View >
                    <Text onPress={()=>this.onPress()}>点击</Text>
                </View>
            </View>
        );
    }
}