/**
 * Created by liuxy on 16/9/6.
 */
import React,{Component} from 'react';
import {
    Navigator,
} from 'react-native';

import MainUI from './ui/main'


import RNNotification from 'react-native-notification-android';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {name: 'main', title:'ApiDemos', component: MainUI}
            ],
        };
        notification = new RNNotification();
        notification.onNotificationClicked(()=>{
            console.log(11111111)
        });
    }

    render() {
        return (
            <Navigator
                initialRoute={this.state.routes[0]}
                // renderScene={(route, navigator) =>
                //     <Text>Hello {route.title}!</Text>
                // }
                renderScene={(route, navigator) =>{
                    let Component = route.component;
                    return <Component {...route.passProps} navigator={navigator} route={route}></Component>
                }}
                // configureScene={() => ({
                //   ...Navigator.SceneConfigs.HorizontalSwipeJump,
                // })}
            />
        );
    }
}

// export default App