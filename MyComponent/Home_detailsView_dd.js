/**
 * Created by linxingdong on 16/8/29.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import Dimensions from 'Dimensions'
var {width, height} = Dimensions.get('window')
class Home_detailsView_dd extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            testName:'',
        };
    }

    // 自定义方法
    handle() {

    }

    // 渲染
    render() {
        return (
            <View style={styles.bigViewStyles}>
                <TouchableOpacity
                    onPress={()=>this.popNavigatorView()}
                >
                    <Text>
                        {this.state.testName}
                        Home_detailsView_dd
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    popNavigatorView(){
        this.props.navigator.pop()
    }
    changeTheStateInfo(){

    }

}

const styles = StyleSheet.create({
    bigViewStyles: {
        backgroundColor: 'green',
        // flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:height,
    },
    textStyles:{
      backgroundColor:'red',
    }
})

export default Home_detailsView_dd;
