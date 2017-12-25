'use strict';
import React, {Component} from 'react';
import {
    StyleSheet, Animated, PanResponder,
    View, Text,
} from 'react-native';

export default class Swiper extends Component {

    position = new Animated.Value(0);//当前在哪一页
    positionValue = 0;
    responder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => false,
        onStartShouldSetPanResponderCapture: (e, gestureState) => false,
        onMoveShouldSetPanResponder: (e, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (e, gestureState) => true,
        onShouldBlockNativeResponder: (e, gestureState) => {
            // 是否阻止原生组件成为JS响应者 only Android 缺省返回 true
            return true;
        },
        onPanResponderTerminationRequest: (e, gestureState) => false,
        onPanResponderGrant: (e, gestureState) => {
            this.position.setOffset(this.positionValue);
            this.position.setValue(0);
        },
        onPanResponderMove: (e, gestureState) => {
            let {dx} = gestureState;
            this.position.setValue(dx / -this.state.width);
        },
        onPanResponderRelease: (e, gestureState) => {
            const {vx} = gestureState;

            this.position.flattenOffset();
            const childrenCount = React.Children.count(this.props.children);
            const left = Math.floor(this.positionValue);
            const right = left + 1;
            let result;
            if (vx > 0.05) {
                result = left;
            } else if (vx < -0.05) {
                result = right;
            } else {
                result = Math.round(this.positionValue);
            }
            if (result < 0){
                result += childrenCount;
                this.position.setValue(this.positionValue + childrenCount);
            } else if(result >= childrenCount) {
                result -= childrenCount;
                this.position.setValue(this.positionValue - childrenCount);
            }
            Animated.spring(this.position, {
                toValue: result,
            }).start();
        },
    });

    constructor(props) {
        super(props);
        this.position.addListener(v => {
            this.positionValue = v.value;
        });
        this.state = {};
    }

    onLayout = (event) => {
        const w = event.nativeEvent.layout.width;
        if (w !== this.state.width) {
            this.setState({width: w});
        }
    };

    render() {
        const {style, children} = this.props;
        const {width} = this.state;
        if (!width) {
            return (
                <View style={[].concat(styles.container, style)}
                      onLayout={this.onLayout}></View>
            );
        }
        const r = Math.sqrt(3) / 2 * width;
        return (
            <View style={[].concat(styles.container, style)}
                  onLayout={this.onLayout}
                  {...this.responder.panHandlers}>
                {
                    children.map((child, i) => {
                        return (
                            <Animated.View key={i} style={[
                                styles.item, {
                                    transform: [
                                        {scale: 0.5},
                                        // {
                                        //     translateX: this.position.interpolate({
                                        //         inputRange: [i, i + 1],
                                        //         outputRange: [0, -width]
                                        //     })
                                        // },
                                        {perspective: 850},
                                        {rotateY: '90deg'},
                                        {translateX: r},
                                        {rotateY: '-90deg'},
                                        {
                                            rotateY: this.position.interpolate({
                                                inputRange: [i, i + 1],
                                                outputRange: ['0deg', '-60deg']
                                            })
                                        },
                                        {rotateY: '-90deg'},
                                        {translateX: r},
                                        {rotateY: '90deg'}
                                    ]
                                }
                            ]}>{child}
                            </Animated.View>
                        );
                    })
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
    },
    item: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});
