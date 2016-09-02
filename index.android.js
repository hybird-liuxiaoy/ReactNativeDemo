/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    TextInput,ScrollView, Image,ListView,Navigator,TouchableHighlight,
    WebView, WebSocket
} from 'react-native';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

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

//prop 属性
class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
        <Image source={pic} style={{width: 193, height: 110}} />
    );
  }
}
//state 状态
// css样式
// flex占位布局 位置分配有些奇怪
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
        <View style={{flex: 1}}>
        <Text style={[styles.container,{flex: 2}]}>{display}</Text>
          <Text style={[styles.container, styles.instructions,{flex: 2, width: 500, backgroundColor: 'powderblue'}]}>{display}</Text>
          </View>
    );
  }
}
//ScrollViewDemo
class ScrollViewDemo extends Component {
  render() {
    return(
        //使用网络图片 需要手动指定图片的尺寸
        //使用drawable下的图片资源 需要保证图片存在和手动指定图片的尺寸
        //使用设备上图片 未实现 请参考 http://reactnative.cn/docs/0.30/cameraroll.html
        //使用js项目图片 无需指定尺寸，因为它们的尺寸在加载时就可以立刻知道  注意：为了使新的图片资源机制正常工作，require中的图片名字必须是一个静态字符串。
    //通过嵌套来实现背景图片
        <ScrollView>
          <Text style={{fontSize:16}}>Scroll me plz</Text>
          <Image source={{url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} style={{width: 193, height: 110}} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} ><Text>通过嵌套来实现背景图片</Text></Image>
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:16}}>If you like</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:16}}>Scrolling down</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}

//ListViewDemo
class ListViewDemo extends Component {
  // 初始化伪数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
        <View style={{paddingTop: 22}}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
    );
  }
}

//NavigatorDemo
class NavigatorDemo extends Component{
  render() {
    return (
        <Navigator
            initialRoute={{ title: 'My Initial Scene', index: 0 }}
            renderScene={(route, navigator) =>
            <MyScene title={route.title}
              // Function to call when a new scene should be displayed
              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  title: 'Scene ' + nextIndex,
                  index: nextIndex,
                });
              }}

              // Function to call to go back to the previous scene
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
          />}
        />
    );
  }
}
//自定义属性 事件及其触发方法
class MyScene extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    }
    //1.创建阶段
    getDefaultProps(){
        //在创建类的时候被调用,组件内部不允许修改自己的props
        return {};
    }

    //2.实例化阶段
    getInitialState(){
        //获取this.status的默认值
        return {};
    }

    componentWillMount(){
        //这是React的生命周期函数，会在界面加载完成后执行一次
        //在render()之前被调用
        //业务逻辑的处理都应该放在这里,如对state的操作等
    },

    render() {
        //渲染并返回一个虚拟DOM
        //根据diff算法生成需要更新的虚拟DOM数据
        //开发者建议:只做数据与模板的组合,不应进行state等逻辑的修改
        return (
            <View>
                <Text>Current Scene: { this.props.title }</Text>
                <TouchableHighlight onPress={this.props.onForward}>
                    <Text>Tap me to load the next scene</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>Tap me to go back</Text>
                </TouchableHighlight>
            </View>
        )
    }

    componentDidMount(){
        //在render()之后被调用
        //该方法中,reactjs会使用render返回的虚拟DOM对象来创建真实的DOM结构
    }

    //3.更新阶段
    componentWillRecieveProps(object nextProps){
        //在this.props被修改或者父组件调用setProps()之后调用
    }
    shouldComponentUpdate(nextProps, nextState){
        //是否需要更新
        return true;
    }
    componentWillUpdate(object nextProps, object nextState){
        //将要更新
    }
    componentDidUpdate(){
        //更新完毕
    }

    //4.销毁阶段
    componentWillUnMount(){
        //这是React的生命周期函数，会在界面将被卸载时执行一次
        //开发者建议:取消事件绑定、移除虚拟DOM中对应组件的数据结构、销毁一些无效的定时器等工作
    }


}



//demo
class BlinkApp extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
        <View>
          <Text text="处理文本输入"></Text>
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
          <TextInput
              style={{height: 40}}
              placeholder="Type here to translate!"
              onChangeText={(text) => {
                  this.setState({text});
                  var ToastAndroid = require('./ToastAndroid');
                  // ToastAndroid.show('Awesome', ToastAndroid.SHORT);
                  ToastAndroid.measureLayout(11,22,
                      (msg) =>{console.log(msg);ToastAndroid.show(msg,ToastAndroid.SHORT)},
                      (x, y, width, height) => {
                        console.log(x + ':' + y + ':' + width + ':' + height);
                        ToastAndroid.show(x + ':' + y + ':' + width + ':' + height,ToastAndroid.SHORT)}
                   );
              }}
          />
          <Blink text='I love to blink' />
          <Blink text='Yes blinking is so great' />
          <Blink text='Why did they ever take this out of HTML' />
          <Blink text='Look at me look at me look at me' />
        </View>
    );
  }
}

//network 使用Fetch API https://developer.mozilla.org/en-US/docs/Web/API/Request
class FetchDemo extends Component{
  constructor(props) {
    super(props);
    fetch('https://www.baidu.com/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }
  getMoviesFromApiAsync() {
    return fetch('http://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.movies;
        })
        .catch((error) => {
          console.error(error);
        });
  }
  async getMoviesFromApi() {
    try {
      let response = await fetch('http://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }
}

//network 使用XMLHttpRequest API https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
class XMLHttpRequestDemo extends Component{
  constructor(props) {
    super(props);
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };

    request.open('GET', 'https://mywebsite.com/endpoint/');
    request.send();
  }
}

//network 使用WebSocket API https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
class WebSocketDemo extends Component {
  constructor(props) {
    super(props);
    var ws = new WebSocket('ws://host.com/path');

    ws.onopen = () => {
      // connection opened

      ws.send('something'); // send a message
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }
}

//JavaScript模块可以通过Subscribablemixin的addListenerOn方法来接受事件。
class AcceptDemo extends Component{
    constructor(props) {
        super(props);
        var { DeviceEventEmitter } = require('react-native');
        var ScrollResponderMixin = {
            mixins: [Subscribable.Mixin],
            componentWillMount: function () {
                this.addListenerOn(DeviceEventEmitter,
                    'keyboardWillShow',
                    this.scrollResponderKeyboardWillShow);
            },
            scrollResponderKeyboardWillShow: function (e:Event) {
                this.keyboardWillOpenTo = e;
                this.props.onKeyboardWillShow && this.props.onKeyboardWillShow(e);
            },
            // //componentWillMount和scrollResponderKeyboardWillShow可以合起来写 如下:
            // componentWillMount: function() {
            //     DeviceEventEmitter.addListener('keyboardWillShow', function(e: Event) {
            //         // handle event.
            //     });
            // }
        }
    }
}

AppRegistry.registerComponent('AwesomeProject', () => BlinkApp);// 注意，这里用引号括起来的'AwesomeProject'必须和你init创建的项目名一致
