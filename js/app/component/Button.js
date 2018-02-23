'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';

export default class Button extends Component {

    static propTypes = {
        // ...View.propTypes,
        isGrey: React.PropTypes.bool,
        loading: React.PropTypes.bool,
        loadingSize: ActivityIndicator.propTypes.size,
        loadingColor: ActivityIndicator.propTypes.color,
        onPress: React.PropTypes.func,
        text: React.PropTypes.string,
        buttonStyle: View.propTypes.style,
        buttonTextStyle: Text.propTypes.style,
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <View style={styles.submitContainer}>
                <TouchableOpacity
                    activeOpacity={0.4}
                    style={[this.props.isGrey ? styles.submitContainerViewGrey : styles.submitContainerView, this.props.buttonStyle]}
                    onPress={this.props.onPress}>
                    {
                        this.props.loading ?
                            <ActivityIndicator size={this.props.loadingSize || "small"}
                                               color={this.props.loadingColor || "#ffffff"}/> :
                            <Text
                                style={[this.props.isGrey ? styles.submitGrey : styles.submit, this.props.buttonTextStyle]}>
                                {this.props.text}
                            </Text>
                    }
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
        borderWidth: 1,
        borderRadius: 5
    },
    submitContainerViewGrey: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1,
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
