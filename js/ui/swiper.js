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
        this.state = {};
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Swiper style={styles.swiper}>
                    <View style={[styles.rect, {backgroundColor: "red"}]} />
                    <View style={[styles.rect, {backgroundColor: "orange"}]} />
                    <View style={[styles.rect, {backgroundColor: "yellow"}]} />
                    <View style={[styles.rect, {backgroundColor: "green"}]} />
                    <View style={[styles.rect, {backgroundColor: "blue"}]} />
                    <View style={[styles.rect, {backgroundColor: "black"}]} />
                </Swiper>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    swiper: {
        height: 240,
    },
    rect: {
        flex: 1
    }
});
