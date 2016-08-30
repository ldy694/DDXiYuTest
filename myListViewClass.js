import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Image,
} from 'react-native';
var Cars = require('./Car.json');


export default class myListViewClass extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        var getDataBlob = (dataBlob, sectionID)=> {
            return dataBlob[sectionID]
        };
        var getRowData = (dataBlob, sectionID, rowID)=> {
            return dataBlob[sectionID + ':' + rowID]
        };
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                getSectionData: getDataBlob,
                getRowData: getRowData,
                rowHasChanged: (r1, r2)=>r1 !== r2,
                sectionHeaderHasChanged: (s1, s2)=>s1 !== s2,
            }),
        };
    }

    // 自定义方法
    handle() {

    }

    // 渲染
    render() {
        return (
            <View style={styles.bigViewStyles}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.myrenderRow}
                    renderSectionHeader={this.myrenderSectionHeader}
                    contentContainerStyle={styles.listViewStyles}
                    initialListSize={20}
                    pageSize={20}
                />

            </View>
        );
    }

    componentDidMount() {
        this.upTheListViewinfodd();
    }

    upTheListViewinfodd() {
        var carArr = Cars.data;
        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];
        for (var i = 0; i < carArr.length; i++) {
            sectionIDs.push(i);
            var sectionArr = carArr[i];
            dataBlob[i] = sectionArr.title;
            rowIDs[i] = [];
            for (var j = 0; j < sectionArr.cars.length; j++) {
                rowIDs[i].push(j);
                dataBlob[i + ':' + j] = sectionArr.cars[j];
            }
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        })
    }

    myrenderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionHeaderStyle}>
                <Text>{sectionData}</Text>
            </View>
        )
    }

    myrenderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity

            >
                <View style={styles.cellStyles}>
                    <Image source={{uri: rowData.icon}} style={styles.cellImageStyles}/>
                    <Text>{rowData.name}, {sectionID}, {rowID}, {highlightRow},</Text>

                </View>
                <View style={{
                    height: 0.5,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 0,
                    backgroundColor: 'gray'
                }}></View>
            </TouchableOpacity>
        )
    }
}
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    bigViewStyles: {
        // flex: 1,
        marginTop: 20,
        width: width,
        height: height - 20,
    },
    listViewStyles: {
        backgroundColor: '#dddddd',
        // width: width,
        // height: height - 20,
    },
    cellStyles: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cellImageStyles: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    sectionHeaderStyle: {
        height: 20,
        backgroundColor: '#ff6e40',
    },
})
