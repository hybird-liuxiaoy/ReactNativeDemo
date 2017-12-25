'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View, Text, TextInput
} from 'react-native';

export default class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _onChangeText = (text) => {
        const {onChangeText} = this.props;
        this.setState({text});
        onChangeText && onChangeText(text);
    };

    render() {
        const {text = ''} = this.state;
        const {style, maxLength} = this.props;
        const textLength = text.length;
        return (
            <View style={[styles.wrapper, style]}>
                <TextInput
                    {...this.props}
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                    multiline
                    onChangeText={this._onChangeText}
                />
                <View style={styles.hint}>
                    <Text style={textLength >= maxLength ? styles.hintMaxText : styles.hintText}>
                        {textLength}</Text>
                    <Text style={styles.hintText}>/{maxLength}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    wrapper: {
        borderColor: '#acacac',
        borderWidth: 1,
        borderRadius: 4
    },
    input: {
        flex: 1,
        textAlignVertical: 'top'
    },
    hint: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 4,
        marginBottom: 4
    },
    hintMaxText: {
        color: 'red',
        fontSize: 18,
    },
    hintText: {
        color: 'grey',
        fontSize: 12
    }
});
