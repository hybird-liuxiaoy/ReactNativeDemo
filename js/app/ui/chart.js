'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import * as d3 from 'd3';
import Graph from 'react-native-line-plot';

import Lib from '../../util/lib';

export default class ChartDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let that = this;
        Lib.Fetch.getJson('http://192.168.1.5:8000', (err, json) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(json);
            let data = [];
            data.push(json.means.map((x, i) => [i, x]));
            that.setState({data});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Graph
                    graphWidth={Lib.getScreenWidth() - 20}
                    graphHeight={Lib.getScreenHeight() - 60}
                    data={this.state.data}
                    legend={["y=sin(x)", "y=tan(x)", "采集数据"]}
                    graphType={[, , '*']}
                    graphColorPrimary={['#d00000', '#00d000', '#0000d0']}
                    graphColorSecondary='#000000'
                    graphWidthPrimary="1"
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
