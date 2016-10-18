'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,Text,TouchableWithoutFeedback
} from 'react-native';

import { RadioButtons } from 'react-native-radio-buttons'
import { SegmentedControls } from 'react-native-radio-buttons'

export default class SegmentedAndroid extends Component {

    constructor(props) {
        super(props);
        this.state={
            selectedOption:null
        };
    }

    onSelectPosition(event){
        console.log(event);
    }
    render() {
        const options = [
            "Option 1",
            "Option 2","Option 3"
        ];

        function setSelectedOption(selectedOption){
            this.setState({
                selectedOption
            });
        }

        function renderOption(option, selected, onSelect, index){
            const style = selected ? { fontWeight: 'bold'} : {};

            return (
                <TouchableWithoutFeedback onPress={onSelect} key={index}>
                   <View>
                        <Text style={style}>{option}</Text>
                   </View>
                </TouchableWithoutFeedback>
            );
        }

        function renderContainer(optionNodes){
            return <View>{optionNodes}</View>;
        }

        return (
            <View style={{margin: 20}}>
                <RadioButtons
                    options={ options }
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={this.state.selectedOption }
                    renderOption={ renderOption }
                    renderContainer={ renderContainer }
                />
                <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
                <SegmentedControls
                    tint= {'#033367'}
                    selectedTint= {'#ffffff'}
                    backTint= {'#ffffff'}
                    options={ options }
                    allowFontScaling={ false } // default: true
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={ this.state.selectedOption }
                />
            </View>);
    }
}