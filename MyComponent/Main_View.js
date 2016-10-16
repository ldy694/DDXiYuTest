/**
 * Created by linxingdong on 16/8/29.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Navigator,
    Image,

} from 'react-native';

import Home from './LD_Home'
import Second from './LD_Second'
import Three from './LD_Three'
import Four from './LD_Four'
import TabNavigator from 'react-native-tab-navigator';
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
export default class Main_View extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab: 'home',
        };
    }

    // 自定义方法
    handle() {

    }

    // 渲染
    render() {
        return (
            <TabNavigator
                tabBarShadowStyle={[{backgroundColor: 'gray'}, styles.screenStyles]}
            >
                <TabNavigator.Item
                    ref='tabbb'
                    title="首页"
                    titleStyle={{color: '#333333'}}
                    selectedTitleStyle={{color: 'green'}}
                    renderIcon={() => <Image source={require('../img/home_dd.png')} style={styles.iconStyles}/>}
                    renderSelectedIcon={() => <Image source={require('../img/home_dd_selected.png')}
                                                     style={styles.iconSelectedStyles}/>}
                    //badgeText="1"
                    onPress={() => this.setState({selectedTab: 'home'})}
                    selected={this.state.selectedTab === 'home'}
                >
                    <Navigator
                        ref='navvv'
                        sceneStyle={{flex: 1}}//场景样式
                        initialRoute={{name: '首页', component: Home}}//初始化场景
                        configureScene={(route)=> {//配置场景
                            return Navigator.SceneConfigs.PushFromRight;
                        }}
                        renderScene={(route, navigator)=> {//进行场景
                            let Comm = route.component;
                            return (
                                    <Comm {...route.params} navigator={navigator} ref='uppp' />
                            )
                        }}
                    />


                </TabNavigator.Item>
                <TabNavigator.Item
                    title="分类"
                    titleStyle={{color: '#333333'}}
                    selectedTitleStyle={{color: 'green'}}

                    renderIcon={() => <Image source={require('../img/category_dd.png')} style={styles.iconStyles}/>}
                    renderSelectedIcon={() => <Image source={require('../img/category_dd_selected.png')}
                                                     style={styles.iconSelectedStyles}/>}
                    //badgeText="1"
                    onPress={() => this.setState({selectedTab: 'Second'})}
                    selected={this.state.selectedTab === 'Second'}
                >
                    <Navigator
                        initialRoute={{name: '第二页', component: Second}}
                        configureScene={(route)=> {
                            return Navigator.SceneConfigs.PushFromRight;
                        }}
                        renderScene={(route, navigator)=> {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator}/>
                        }}
                    />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.selectedTab === 'Three' ? ' ' : '发现'}
                    titleStyle={{color: '#333333', marginTop: -7}}
                    selectedTitleStyle={{color: 'green', marginTop: 5, height: 0}}
                    renderIcon={() => <Image source={require('../img/xiyuicon_dd.png')}
                                             style={styles.iconSelectedFindeStyles}/>}
                    renderSelectedIcon={() => <Image source={require('../img/xiyuicon_dd_selected.png')}
                                                     style={styles.iconSelectedFindeStyles}/>}

                    //badgeText="1"
                    onPress={() => this.setState({selectedTab: 'Three'})}
                    selected={this.state.selectedTab === 'Three'}
                >
                    <Second/>
                </TabNavigator.Item>
                {this.creatTheTabNavigatorItem('购物车', require('../img/shopcart_dd.png'), require('../img/shopcart_dd_selected.png'), 'Four', Second)}
                {this.creatTheTabNavigatorItem("我的西域", require('../img/mine_dd.png'), require('../img/mine_dd_selected.png'), 'Mine', Second)}
            </TabNavigator>
        );
    }

    componentDidMount() {
        var NoView = this.refs.biggg
        console.log('来来来')
    }

    creatTheTabNavigatorItem(title, imgStr, selectedImgStr, tabName, ControlView) {
        return (
            <TabNavigator.Item
                title={title}
                titleStyle={{color: '#333333'}}
                selectedTitleStyle={{color: 'green'}}
                renderIcon={()=><Image source={imgStr} style={styles.iconStyles}/>}
                renderSelectedIcon={()=><Image source={selectedImgStr}
                                               style={styles.iconSelectedStyles}/>}
                onPress={()=>this.setState({selectedTab: tabName})}
                selected={this.state.selectedTab === tabName}
            >
                <ControlView/>
            </TabNavigator.Item>
        )
    }
}
const styles = StyleSheet.create({
    screenStyles: {
        // width: width,
        // height: height-0,
        // flex:1,
    },
    iconSelectedStyles: {
        width: 25,
        height: 25,
    },
    iconSelectedFindeStyles: {
        width: 37,
        height: 37,
    },
    iconStyles: {
        width: 25,
        height: 25,
    }
})
