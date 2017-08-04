/**
 * Created by wind on 16/8/22.
 */
'use strict';
import React,{Component} from 'react';
import {
    StyleSheet,
    View, Text, TouchableOpacity,
} from 'react-native';

export default class Button extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isGrey: this.props.isGrey || false,
        };
      }

    render() {
        return (
            <View style={styles.submitContainer}>
                <TouchableOpacity
                    activeOpacity={0.4}
                    style={[this.state.isGrey ? styles.submitContainerViewGrey : styles.submitContainerView,this.props.buttonStyle]}
                    onPress={this.props.submitCallback} >
                    <Text
                        style={[this.state.isGrey ? styles.submitGrey : styles.submit,this.props.buttonTextStyle]}>
                        {this.props.buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

let styles = StyleSheet.create({
    submitContainer: {
        alignItems: 'center'
    },
    submitContainerView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth:1,
        borderRadius: 5
    },
    submitContainerViewGrey: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth:1,
        borderRadius: 5,
    },
    submit: {
        color: '#ffffff',
        fontSize: 18,
    },
    submitGrey: {
        color: '#000000',
        fontSize: 18
    }
});