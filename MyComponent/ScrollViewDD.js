import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native';
import Dimensions from 'Dimensions';
import reactTimerMinDD from 'react-timer-mixin';
var {width, height} = Dimensions.get('window');
// var imageData = require('./ImageData.json');
// import imageData from './ImageData.json';

class ScrollViewDDss extends Component {
    static defaultProps = ({
        imageData:{},
        testFun:''
    })
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            nowPage: 0,
        };
    }

    render() {

        return (
            <View style={styles.bigViewStyles}>
                <ScrollView
                    ref='ddScrollView'
                    style={styles.mainStyles}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    //onScrollEndDrag={(ss)=>this.onEndDrag(ss)}
                    onScrollBeginDrag={(ss)=>this.scrollViewBeginDragDD(ss)}
                    //onMomentumScrollBegin={(ss)=>this.onEndDrag(ss)}
                    onMomentumScrollEnd={(ss)=>this.scrollViewEndMomentumDD(ss)}
                    //onScrollAnimationEnd={(ss)=>this.onEndDrag(ss)}
                    //onScroll={(ss)=>this.onEndDrag(ss)}
                >
                    {this.createAllChildView()}
                </ScrollView>
                <View style={styles.nowNumDDStyles}>
                    {this.createNowChildViewPage()}
                </View>
            </View>
        );
    }

    scrollViewBeginDragDD(sc) {
        console.log('onScrollBeginDrag')
        if (this.props.testFun){
            this.props.testFun(this.props.imageData.data[this.state.nowPage].title);
        }
    }

    scrollViewEndMomentumDD(sc) {
        var nowSetX = sc.nativeEvent.contentOffset.x;
        var page = Math.floor(nowSetX / width);
        this.setState({
            nowPage: page,
        })
    }

    startTimerInterval() {

        this.timer = setInterval(()=> {
            var Imarr = this.props.imageData.data;
            var pageNum = 0;
            if (this.state.nowPage >= Imarr.length - 1) {
                pageNum = 0;
            } else {
                pageNum = this.state.nowPage + 1;
            }
            this.setState({
                nowPage: pageNum,
            })
            console.log(pageNum)
            var scrolls = this.refs.ddScrollView;
            scrolls.scrollTo({x: width * pageNum, y: 0, animated: true})
        }, 2000);
    }

    componentDidMount() {
        this.startTimerInterval()
    }

    componentWillUnMount() {
        this.timer && clearInterval(this.timer);
    }

    createAllChildView() {
        var arr = [];
        var imgArr = this.props.imageData.data
        for (var i = 0; i < this.props.imageData.data.length; i++) {
            var image = this.props.imageData.data[i].img;

            var reqss;
            switch (i) {
                case 0:
                    reqss = require('./img/img_01.png');
                    break;
                case 1:
                    reqss = require('./img/img_02.png');
                    break;
                case 2:
                    reqss = require('./img/img_03.png');
                    break;
                case 3:
                    reqss = require('./img/img_04.png');
                    break;
                default:
                    reqss = require('./img/img_05.png');
                    break;
            }
            arr.push(
                <Image
                    key={i}
                    style={styles.scrollviewChildImageStyles}
                    source={reqss}
                />
            )
        }
        return arr;
    }

    createNowChildViewPage() {
        var arr = [];
        for (var i=0;i<this.props.imageData.data.length;i++) {
            this.state.nowPage === i ? (
                arr.push(<Text key={i} style={[styles.nowNumTextStyles, {color: 'yellow'}]}>&bull;</Text>)
            ) : (
                arr.push(<Text key={i} style={[styles.nowNumTextStyles, {color: '#333333'}]}>&bull;</Text>)
            );
        }
        return arr;
    }
}
const styles = StyleSheet.create({
    scrollviewChildImageStyles: {
        width: width,
        height: 100,
    },
    nowNumDDStyles: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        width: width,
        height: 20,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nowNumTextStyles: {
        color: 'yellow',
        fontSize: 25,
        marginLeft: 5,
    },
    bigViewStyles: {
        height: 100,
        width: width,
    },
    mainStyles: {
        backgroundColor: '#dddddd',
        // flex:1,
        // marginTop: 20,
        width: width,
        height: 100,
    },

});


export default ScrollViewDDss;
