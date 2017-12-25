'use strict';
import {
    NetInfo, Platform, BackHandler, PixelRatio, ToastAndroid
} from 'react-native';

import Dimensions from 'Dimensions';

import Time from './time';
import Fetch from './fetch';

// Private array of chars to use
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
const lib = {
    Time, Fetch,
    getScreenHeight: function () {
        return Dimensions.get('window').height;
    },
    getScreenWidth: function () {
        return Dimensions.get('window').width;
    },

    netInfoStartDetect: function (callback) {
        NetInfo.isConnected.fetch().then(
            (isConnected) => {
                if (!isConnected) callback();
            }
        );
    },
    addNetInfo: function (callback) {
        console.log('Network connected.addEventListener');
        return NetInfo.isConnected.addEventListener(
            'change', (isConnected) => {
                console.log('Network connected EventListener');
                callback(isConnected);
            }
        );
    },
    removeNetInfo: function (eventListener) {
        console.log('Network connected.removeEventListener');
        if (eventListener) {
            eventListener.remove();
        }
    },

    addSimpleBack: function (navigator) {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {
                if (navigator.getCurrentRoutes().length > 1) {
                    navigator.pop();
                } else {
                    BackHandler.exitApp();
                }
                return true;
            });
        }
    },
    removeSimpleBack: function (navigator) {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', () => {
                if (navigator.getCurrentRoutes().length > 1) {
                    navigator.pop();
                } else {
                    BackHandler.exitApp();
                }
                return true;
            });
        }
    },

    addAndroidReturn: function (self) {
        if (Platform.OS === 'android') {
            console.log(' BackHandler.addEventListener');
            BackHandler.addEventListener('hardwareBackPress', () => {
                if (self.state.isReturn) {
                    return false;
                } else {
                    self.setState({
                        isReturn: true
                    });
                    setTimeout(() => {
                        self.setState({
                            isReturn: false
                        });
                    }, 1200);
                    return true;
                }

            });
        }
    },
    removeAndroidReturn: function (self) {
        if (Platform.OS === 'android') {
            console.log(' BackHandler.removeEventListener');
            BackHandler.removeEventListener('hardwareBackPress', () => {
                if (self.state.isReturn) {
                    return false;
                } else {
                    self.setState({
                        isReturn: true
                    });
                    setTimeout(() => {
                        self.setState({
                            isReturn: false
                        });
                    }, 1200)
                    return true;
                }

            });
        }
    },

    exitApp() {
        BackHandler.exitApp();
    },

    toast(message) {
        ToastAndroid.show(message, ToastAndroid.LONG);
    },

    getPixelRatio() {
        return PixelRatio.get();
    },

    getOnePixel() {
        // import {StyleSheet}from 'react-native';
        // StyleSheet.hairlineWidth
        return 1 / this.getPixelRatio();
    },

    platformOs() {
        return Platform.OS;
    },

    isAndroid() {
        return this.platformOs() === 'android';
    },

    isIOS() {
        return this.platformOs() === 'ios';
    },

    beforeAndroidVersion(version) {
        return Platform.OS === 'android' && Platform.Version < version;
    },

    useStatus() {
        return !this.beforeAndroidVersion(21);
    },

    isEmpty: function (obj) {
        for (const name in obj) {
            return false;
        }
        return true;
    },
    isNumber(obj) {
        // typeof obj === 'number' && !isNaN(num);
        return obj === +obj;
    },
    isString(obj) {
        return obj === obj + '';
    },
    isBoolean(obj) {
        return obj === !!obj;
    },
    isNotNumber(num) {
        // isNaN(num);//can not diff true\false "" " " "  "...

        // return Number(num).toString().length !== parseFloat(num).toString().length;

        let n = parseFloat(num);
        return isNaN(n);
    },
    toFixed(x, radix) {
        // return (x*1.0).toFixed(radix);
        return parseFloat(x).toFixed(radix);
        // return Math.round(x*Math.pow(10,radix))/Math.pow(10,radix);
    },

    // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
    // by minimizing calls to random()
    uuidFast() {
        const chars = CHARS, uuid = new Array(36);
        let rnd = 0, r;
        for (let i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '-';
            } else if (i === 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    },

    // removeArray(array,index){
    //     if (index >=0 && index < array.length){
    //         // array = array.slice(0,index).concat(array.slice(index+1,array.length));
    //         array.splice(index,1);
    //     }
    //     return array;
    // },

    removeArray(array, value) {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            array.splice(index, 1);
        }
    },

    sortArrayWithIndex(array, compareFn) {
        if (array) {
            let arrayWrap = [];
            for (let i = 0; i < array.length; i++) {
                arrayWrap.push({index: i, value: array[i]});
            }
            return arrayWrap.sort((one, another) => {
                return compareFn(one.value, another.value);
            });
        }
        return array;
    },

    parserSignedHex(low, high) {
        return (((high << 8) | low) << 16) >> 16;
    }
};

export default lib;