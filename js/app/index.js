'use strict';
import React, {Component} from 'react';
import {
    // Navigator,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import MainUI from './ui/main';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {name: 'main', title: 'ApiDemos', component: MainUI}
            ],
        };
    }

    render() {
        return (
            <Navigator
                initialRoute={this.state.routes[0]}
                // renderScene={(route, navigator) =>
                //     <Text>Hello {route.title}!</Text>
                // }
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return (<Component {...route.passProps} navigator={navigator} route={route}/>);
                }}
                // configureScene={() => ({
                //   ...Navigator.SceneConfigs.HorizontalSwipeJump,
                // })}
            />
        );
    }
};

// export default App;
