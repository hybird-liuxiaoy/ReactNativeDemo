/**
 * Created by liuxy on 01/08/2017.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet, Dimensions,
    View
} from 'react-native';

import * as d3 from 'd3';
import Graph from 'react-native-line-plot';

export default class ChartDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount(){
    }

    render(){
        let dimensions = Dimensions.get('window');

        return (
            <View style={styles.container}>
                <Graph
                    graphWidth={dimensions.width-20}
                    graphHeight={dimensions.height-60}
                    data={
                        [
                            d3.range(-40,46).map(v=>{return [v,Math.sin(v/20*Math.PI)];}),
                            d3.range(-40,41).map(v=>{return [v,Math.cos(v/20*Math.PI)];}),
                            d3.range(-9,10).map(v=>{return [v,Math.tan(v/20*Math.PI)];}),
                        ]
                    }
                    legend={["y=sin(x)","y=cos(x)","y=tan(x)"]}
                    graphColorPrimary={['#d00000','#00d000','#0000d0']}
                    graphColorSecondary='#000000'
                    graphWidthPrimary="2.5"
                    graphWidthSecondary="2"
                    xUnit='x'
                    yUnit='y'
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});