import React, {Component} from 'react';

import {
    AppRegistry,
    View,
    Text,
    Navigator,
    TabBarIOS,
} from 'react-native';

import MainView from './MyComponent/Main_View'
import MyList from './myListViewClass'
class BListViewDemo extends Component {
    // 渲染
    render() {
        return (
            <MainView/>
             // <MyList/>
        );
    }

}


AppRegistry.registerComponent('DDListView', () => BListViewDemo);
