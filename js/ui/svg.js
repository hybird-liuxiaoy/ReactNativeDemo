'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {Svg, Circle, Rect} from 'react-native-svg';

export default class SvgDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Svg height={100} width={100} opacity={0.5}>
                    <Circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="blue"
                        strokeWidth="2.5"
                        fill="green" />
                    <Rect
                        x="15"
                        y="15"
                        width="70"
                        height="70"
                        stroke="red"
                        strokeWidth="2"
                        fill="yellow" />
                </Svg>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
