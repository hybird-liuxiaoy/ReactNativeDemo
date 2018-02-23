'use strict';
import React, {Component} from 'react';
import {
    StyleSheet, Dimensions, PanResponder, LayoutAnimation,
    View,
} from 'react-native';

import Svg, {Path} from 'react-native-svg';
import * as d3 from 'd3';

import Axis from './axis';
import Legend from './legend';
import Unit from './unit';

import Morph from 'art/morph/path';
import SvgPath from 'art/modes/svg/path';

let padding = 40;
let xPadding = 40;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height / 2;
const colors = ["#D96D69", "#FC993D", "#47B2F8"];
const legend = ["滚筒轴承温度", "主电机轴承温度", "滚筒轴承温度"];
const unit = "km/h";
let yPadding = padding + Math.floor(legend.length / 3) * 14 - 2;
const AnimationDurationMs = 250;

export default class Line extends Component {

    constructor(props) {
        super(props);

        this.allData = props.data;
        let initPath = this.allData.map(() => '');
        let len = d3.max(this.allData, value => value.length);
        let xStart = len * 2 / 3, xEnd = len;
        this.previous = initPath;
        this.data = this.slice(xStart, xEnd);
        this.state = {
            path: initPath,
            xStart,
            xEnd
        };
    }

    getCurrentRange() {
        let xMax = d3.max(this.data, value => d3.max(value, v => v.x));
        let xMin = d3.min(this.data, value => d3.min(value, v => v.x));
        let yMax = d3.max(this.data, value => d3.max(value, v => v.y));
        let yMin = d3.min(this.data, value => d3.min(value, v => v.y));
        return {xMax, xMin, yMax, yMin};
    }

    componentWillMount() {
        this.computeNextState()
    }

    panResponder = PanResponder.create({
        onStartShouldSetResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) => {
            console.log('Grant', evt.nativeEvent, gestureState)
            let touches = evt.nativeEvent.touches
            if (touches.length == 2) {
                let touch1 = touches[0]
                let touch2 = touches[1]
                this.touch1OriginX = touch1.pageX
                this.touch2OriginX = touch2.pageX
            } else {
                this.touch1OriginX = undefined
                this.touch2OriginX = undefined
                this.slideXorigin = gestureState.dx
            }

        },
        onPanResponderMove: (evt, gestureState) => {
            console.log('Move', evt.nativeEvent, gestureState)
            let touches = evt.nativeEvent.touches;
            if (touches.length == 2) {
                let touch1 = touches[0];
                let touch2 = touches[1];
                this.touch1DestX = touch1.pageX;
                this.touch2DestX = touch2.pageX;
            } else {
                this.touch1DestX = undefined;
                this.touch2DestX = undefined;
                this.slideXdest = gestureState.dx;
            }

            let svgWidth = width - xPadding * 2;

            if (this.touch1OriginX != undefined) {
                let originXdif = Math.abs(this.touch1OriginX - this.touch2OriginX);
                let destXdif = Math.abs(this.touch1DestX - this.touch2DestX);
                if (destXdif < originXdif) {
                    //zoom in
                    let increment = originXdif - destXdif;
                    let left, right;
                    left = this.state.xStart + Math.floor(Math.abs(increment / 2) / svgWidth * this.data[0].length);
                    right = this.state.xEnd - Math.ceil(Math.abs(increment / 2) / svgWidth * this.data[0].length);
                    if (left < 0) left = 0;
                    if (right > this.allData[0].length) right = this.allData[0].length;
                    if (right - left > 8) {
                        this.setState({
                            data: this.slice(left, right),
                            xStart: left,
                            xEnd: right,
                        });
                    }
                }

                if (destXdif > originXdif) {
                    //zoom out
                    let increment = destXdif - originXdif;
                    let left, right;
                    left = this.state.xStart - Math.floor(Math.abs(increment / 2) / svgWidth * this.data[0].length)
                    right = this.state.xEnd + Math.ceil(Math.abs(increment / 2) / svgWidth * this.data[0].length)
                    if (left < 0) left = 0
                    if (right > this.allData[0].length) right = this.allData[0].length
                    if (right - left > 8) {
                        this.setState({
                            data: this.slice(left, right),
                            xStart: left,
                            xEnd: right,
                        });
                    }
                }
            } else {
                let offset = this.slideXdest - this.slideXorigin;
                let offsetLength = Math.ceil(Math.abs(offset) / svgWidth * this.data[0].length)
                let left, right
                if (offset > 0) {
                    //go to right
                    let marginRight = this.allData[0].length - this.state.xEnd;
                    if (offsetLength > marginRight) {
                        left = this.state.xStart + marginRight;
                        right = this.state.xEnd + marginRight;
                    } else {
                        left = this.state.xStart + offsetLength;
                        right = this.state.xEnd + offsetLength;
                    }

                    if (left >= 0 && right <= this.allData[0].length) {
                        this.setState({
                            data: this.slice(left, right),
                            xStart: left,
                            xEnd: right,
                        })
                    }
                }
                if (offset < 0) {
                    //go to right
                    let marginLeft = this.state.xStart
                    if (offsetLength > this.state.xStart) {
                        left = this.state.xStart - this.state.xStart
                        right = this.state.xEnd - this.state.xStart
                    } else {
                        left = this.state.xStart - offsetLength
                        right = this.state.xEnd - offsetLength
                    }
                    if (left >= 0 && right <= this.allData[0].length) {
                        this.setState({
                            data: this.slice(left, right),
                            xStart: left,
                            xEnd: right,
                        });
                    }
                }

            }
            this.computeNextState()
        },
    });

    xScale = d3.scaleLinear().domain([xPadding, width - xPadding]);
    yScale = d3.scaleLinear().domain([height - yPadding, yPadding]);
    lineGenerator = d3.line()
        .x(d => this.xScale.invert(d.x))
        .y(d => this.yScale.invert(d.y));
    createScales = (width, height, xPadding, yPadding) => {
        let xScale = d3.scaleLinear().domain([xPadding, width - xPadding]);
        // y grows to the bottom in SVG, but our y axis to the top
        let yScale = d3.scaleLinear().domain([height - yPadding, yPadding]);
        let {xMax, xMin, yMax, yMin} = this.getCurrentRange();
        xScale.range([xMin, xMax]);
        yScale.range([yMin, yMax]);
        return {xScale, yScale, xMax, xMin, yMax, yMin};
    };

    computeNextState(nextProps) {
        let {xMax, xMin, yMax, yMin} = this.getCurrentRange();
        this.xScale.range([xMin, xMax]);
        this.yScale.range([yMin, yMax]);
        let pathTo = this.data.map(lineDataPoints => {
            return this.lineGenerator(lineDataPoints);
        });
        this.pathTo = pathTo;
        this.noAnimate();
        // cancelAnimationFrame(this.animating);
        // this.animating = null;
        // let pathFrom = this.previous;
        // this.pathAnimating = pathTo.map((item,index) => Morph.Tween(pathFrom[index],item));
        // LayoutAnimation.configureNext(
        //     LayoutAnimation.create(
        //         AnimationDurationMs,
        //         LayoutAnimation.Types.easeInEaseOut,
        //         LayoutAnimation.Properties.opacity
        //     )
        // );
        // // Kick off our animations!
        // this.animate();
    }

    noAnimate() {
        this.setState({
            path: this.pathTo
        });
    }

    animate(start) {
        this.animating = requestAnimationFrame(timestamp => {
            if (!start) {
                start = timestamp;
            }

            const delta = (timestamp - start) / AnimationDurationMs;
            if (delta > 1) {
                this.animating = null;
                this.setState({
                    path: this.pathTo
                });
                return;
            }

            this.data.forEach((item, index) => {
                this.pathAnimating[index].tween(delta);
            });
            this.animate(start);
        })
    }

    slice = (start, end) => (
        this.allData.map((item) => item.slice(start, end))
    );

    render() {
        let {xScale, yScale, xMax, xMin, yMax, yMin} = this.createScales(width, height, xPadding, yPadding);
        return (
            <View>
                <View style={{height: 100, backgroundColor: '#FB7B2C'}}/>
                <View {...this.panResponder.panHandlers}>
                    <Svg height={height} width={width}>
                        <Legend
                            legend={legend}
                            colors={colors}
                            xPadding={xPadding}
                        />
                        <Unit
                            x={width - xPadding}
                            unit={unit}
                            y={yPadding}
                        />
                        <Axis
                            width={width - 2 * xPadding}
                            height={height}
                            xPadding={xPadding}
                            yPadding={yPadding}
                            startVal={xMin}
                            endVal={xMax}
                            ticks={8}
                            scale={xScale}/>
                        <Axis
                            width={height - 2 * xPadding}
                            height={height}
                            xPadding={xPadding}
                            yPadding={yPadding}
                            startVal={yMin}
                            endVal={yMax}
                            scale={yScale}
                            ticks={8}
                            vertical/>
                        {
                            this.state.path.map(
                                (path, index) =>
                                    <Path
                                        fill='none'
                                        stroke={colors[index]}
                                        strokeWidth='1.5'
                                        d={SvgPath(path).toString()}
                                        key={index}/>)
                        }
                    </Svg>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
