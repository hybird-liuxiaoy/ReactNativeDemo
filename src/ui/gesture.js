/**
 * Created by liuxy on 16/10/18.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
/**
 * 响应手势的基本单位是responder，具体来说就是View组件，任何View组件都是潜在的responder；
 * 一次手势操作流程：响应touch或者move手势 -> grant（被激活） -> move -> release(结束事件)；
 * 对于大部分应用，使用Touchable*这4个组件，再配合4个Press事件(onPressIn/Out、onPress、onLongPress)就能对用户的手势进行响应。
 * 但是对于比较复杂的交互，还得使用手势响应系统。
 */
export default class GestureDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        //一个普通的View组件成为能响应手势操作的responder，只要设置几个手响应生命周期的方法即可，具体如下：
        this._gestureHandlers1 = {
            onStartShouldSetResponder: () => true,//用户开始触摸屏幕的时候，是否愿意成为响应者；
            onMoveShouldSetResponder: ()=> true,//在每一个触摸点开始移动的时候，是否响应触摸交互；
            onResponderGrant: ()=>{//要开始响应触摸事件了；
                this.setState({bg1: 'red'})
            },
            onResponderMove: ()=>{//用户正在屏幕上移动手指；
                console.log(1)
            },
            onResponderRelease: ()=>{//触摸操作结束收触发；
                this.setState({bg1: 'white'})
            },
        };
        this._gestureHandlers2 = {
            onStartShouldSetResponder: () => false,//触摸事件无效
            onMoveShouldSetResponder: ()=> true,//滑动事件有效
            onResponderGrant: ()=>{//要开始响应触摸事件了；
                this.setState({bg2: 'red'})
            },
            onResponderMove: ()=>{//用户正在屏幕上移动手指；
                console.log(2)
            },
            onResponderRelease: ()=>{//触摸操作结束收触发；
                this.setState({bg2: 'white'})
            },
        };
        this._gestureHandlers3 = {
            onStartShouldSetResponder: () => false,//触摸事件无效
            onMoveShouldSetResponder: ()=> false,//滑动事件无效
            onResponderGrant: ()=>{//要开始响应触摸事件了；
                this.setState({bg3: 'red'})
            },
            onResponderMove: ()=>{//用户正在屏幕上移动手指；
                console.log(3)
            },
            onResponderRelease: ()=>{//触摸操作结束收触发；
                this.setState({bg3: 'white'})
            },
        };

        this._gestureHandlers11 = {
            onStartShouldSetResponder: () => true,//用户开始触摸屏幕的时候，是否愿意成为响应者；
            onMoveShouldSetResponder: ()=> true,//在每一个触摸点开始移动的时候，是否响应触摸交互；
            onResponderGrant: ()=>{//要开始响应触摸事件了；
                this.setState({bg11: 'red'})
            },
            onResponderMove: ()=>{//用户正在屏幕上移动手指；
                console.log(11)
            },
            onResponderRelease: ()=>{//触摸操作结束收触发；
                this.setState({bg11: 'white'})
            },
            onResponderReject:()=> {//响应者现在另有其人，而且暂时不会放权，另作安排；
            },
            onResponderTerminationRequest(){//有其它组件请求接替响应者，当前View是否放权；
                return true;
            },
            onResponderTerminate:()=>{//响应权已经交出；

            }
        }
        this._gestureHandlers12 = {
            onStartShouldSetResponder: () => true,//用户开始触摸屏幕的时候，是否愿意成为响应者；
            onMoveShouldSetResponder: ()=> true,//在每一个触摸点开始移动的时候，是否响应触摸交互；
            onResponderGrant: ()=>{//要开始响应触摸事件了；
                this.setState({bg12: 'red'})
            },
            onResponderMove: ()=>{//用户正在屏幕上移动手指；
                console.log(22)
            },
            onResponderRelease: ()=>{//触摸操作结束收触发；
                this.setState({bg12: 'white'})
            },
            onResponderReject:()=> {//响应者现在另有其人，而且暂时不会放权，另作安排；
            },
            onResponderTerminationRequest(){//有其它组件请求接替响应者，当前View是否放权；
                return false;
            },
            onResponderTerminate:()=>{//响应权已经交出；

            }
        }
    }

    render() {
        return(
            <View style={[styles.container]}>
                <View style={styles.part1}>
                    <View {...this._gestureHandlers1} style={[styles.rect, {backgroundColor:this.state.bg1}]}></View>
                    <View {...this._gestureHandlers2} style={[styles.rect, {backgroundColor:this.state.bg2}]}></View>
                    <View {...this._gestureHandlers3} style={[styles.rect, {backgroundColor:this.state.bg3}]}></View>
                </View>
                <View style={styles.part2}>
                    <View {...this._gestureHandlers11} style={[styles.maxRect, {backgroundColor:this.state.bg11}]}>
                        <View {...this._gestureHandlers12} style={[styles.minRect, {backgroundColor:this.state.bg12}]}></View>
                    </View>
                    {
                    // <View {...this._gestureHandlers21} style={[styles.maxRect, {backgroundColor:this.state.bg21}]}>
                    //     <View {...this._gestureHandlers22} style={[styles.minRect, {backgroundColor:this.state.bg22}]}></View>
                    // </View>
                    }
                </View>

            </View>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1
    },
    part1:{
        flexDirection:'row',
        padding:10,
        height:70,
    },
    part2:{
        flex:1,
        borderTopWidth:1,
        padding:10,
    },
    rect:{
        flex:1,
        borderWidth:1,
        height:50,
        width:50
    },
    minRect:{
        borderWidth:1,
        height:50,
        width:50
    },
    maxRect:{
        borderWidth:1,
        height:100,
        width:100,
        justifyContent:'center',
        alignItems:'center'
    }
});