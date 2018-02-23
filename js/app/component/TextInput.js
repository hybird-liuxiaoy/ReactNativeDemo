'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput as NativeInput
} from 'react-native';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {style} = this.props;
        return (
            <NativeInput
                {...this.props}
                style={[].concat(styles.input).concat(style)}
                underlineColorAndroid={'transparent'}
                numberOfLines={1}/>
        );
    }
};

const styles = StyleSheet.create({
    input: {},
});
