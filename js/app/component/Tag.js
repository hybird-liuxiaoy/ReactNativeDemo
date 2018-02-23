'use strict';
import React from 'react';
import {
    StyleSheet,
    View, Text
} from 'react-native';

const Tag = (props) => {
    const {name, backgroundColor, style, fontStyle} = props;
    return (
        <View
            style={[styles.tag, style, {backgroundColor}]}>
            <Text style={[styles.tagText, fontStyle]}>
                {name}
            </Text>
        </View>
    );
};

const NewTag = (props) => (
    <LevelTag
        backgroundColor='red'
        name='New'/>
);

export default Tag;
export {Tag, NewTag};

let styles = StyleSheet.create({
    tag: {
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 14,
    },
    tagText: {
        color: 'white',
        fontSize: 10,
        paddingHorizontal: 4
    },
});
