/**
 * Created by liuxy on 17/9/18.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Swiper from './common/component/Swiper';

export default class SwiperDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
    }

    render() {
        return(
            <View style={[styles.container]}>
                <Swiper style={styles.swiper}>
                    <View style={[styles.rect,{backgroundColor:"red"}]}></View>
                    <View style={[styles.rect,{backgroundColor:"orange"}]}></View>
                    <View style={[styles.rect,{backgroundColor:"yellow"}]}></View>
                    <View style={[styles.rect,{backgroundColor:"green"}]}></View>
                    <View style={[styles.rect,{backgroundColor:"blue"}]}></View>
                    <View style={[styles.rect,{backgroundColor:"black"}]}></View>
                </Swiper>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    swiper:{
        height: 240,
    },
    rect:{
        flex: 1
    }
});
