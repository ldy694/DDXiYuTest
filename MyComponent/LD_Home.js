import React, {
    Component
} from 'react'
import {
    View,
    ListView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Home_detailsView_dd from './Home_detailsView_dd'
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
var dataBlob = {}, sectionIDs = [], rowIDs = [];

class MyHomeView extends Component {

    constructor(props) {
        super(props);
        var getDataBlob = (dataBlob, sectionID)=>dataBlob[sectionID];
        var getRowData = (dataBlob, sectionID, rowID)=>dataBlob[sectionID + ':' + rowID];
        var url = "http://pb.ehsy.com/categoryRecom";
        var params = {recomId:0, type:0};
        var paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
        this.state = {
            banner:url,
            homePageSku: 'http://pb.ehsy.com/homePageSku',
            homeProductArr: [],
            dataSource: new ListView.DataSource({
                getSectionHeaderData: getDataBlob,
                getRowData: getRowData,
                rowHasChanged: (r1, r2)=>r1 !== r2,
                sectionHeaderHasChanged: (s1, s2)=>s1 !== s2,
            })
        };
    }

    render() {
        return (
            <View style={styles.bigViewStyles}>
                {this.creatNavigatorView()}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>this.renderRowView(rowData)}
                    contentContainerStyle={styles.upListViewStyles}
                />
            </View>
        )
    }

    creatNavigatorView() {
        return (
            <View style={styles.topNavTopStyles}>
                <View style={styles.topNavStyles}>
                    <View style={styles.topNavLeftStyles}>
                        <Image source={require('../img/home_left_icon.png')} style={styles.navLeftIconStyles}/>
                        <Text style={styles.topNavLestTextStyles}>上海</Text>
                    </View>
                    <TextInput
                        style={styles.topNavTextInputStyles}
                        placeholder="西域帮你找SKU"
                    />
                    <View style={styles.topNavRightStyles}>
                        <Image source={require('../img/home_left_icon.png')} style={styles.navLeftIconStyles}/>
                        <Text style={styles.topNavLestTextStyles}>上海</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderRowView(rowData) {
        return (
            <TouchableOpacity style={styles.productCellStyles}
                              onPress={()=>this.pushTheDetails()}>
                <Image source={{uri: rowData.pictureUrl}} style={styles.productCellImageStyles}/>
                <Text style={styles.cellTitleStyles} numberOfLines={1}>{rowData.productName}</Text>
                <Text style={styles.cellNowPriceStyles}>{rowData.salePrice}</Text>
                <Text style={styles.cellOldPriceStyles}>{rowData.marketPrice}</Text>
            </TouchableOpacity>
        )
    }

    pushTheDetails() {
        this.props.navigator.push({
            name: 'Home_detailsView_dd',
            component: Home_detailsView_dd,
        })
    }

    componentDidMount() {
        this.updateTheListView();
    }

    updateTheListView() {
        fetch(this.state.homePageSku, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify()
        })
            .then((data) => data.json())
            .then((jsonData) => {
                var dataArr = jsonData.data;
                dataBlob[0] = ' ';
                sectionIDs.push(0);
                rowIDs[0] = [];
                for (var i = 0; i < dataArr.length; i++) {
                    rowIDs[0].push(i);
                    dataBlob[0 + ':' + i] = dataArr[i];
                }

                this.setState({
                    homeProductArr: jsonData.data,
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                })
            })
            .catch((error) => {
                // console.error(error);
                alert('报错'+error);
            })
        fetch(this.state.banner)
            .then((data)=>data.json())
            .then((jsonData)=> {
                // var banArr = jsonData.data.picurls.home1;
                console.log(jsonData);
            })
            .catch((error)=> {
                alert('报错'+error);
                // console.error(error);
            })
    }


}
const styles = StyleSheet.create({
    bigViewStyles: {
        flex: 1,
    },
    topNavLeftStyles: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topNavLestTextStyles: {
        fontSize: 11,
        color: '#ffffff'
    },
    navLeftIconStyles: {
        width: 30,
        height: 30,

    },
    topNavTextInputStyles: {
        width: width - 100,
        height: 30,
        marginTop: 10,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 15,
    },
    topNavRightStyles: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topNavTopStyles: {
        backgroundColor: 'green',
    },
    topNavStyles: {
        marginTop: 20,
        height: 44,
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    upListViewStyles: {
        // flex: 1,
        // width: width,
        // height: height,
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    productCellStyles: {
        width: (width - 15) / 2.0,
        height: (width - 15) / 2.0 + 50,
        backgroundColor: '#ffffff',
        marginTop: 5,
        marginLeft: 5,

    },
    productCellImageStyles: {
        width: (width - 15) / 2.0,
        height: (width - 15) / 2.0,

    },
    cellTitleStyles: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 5,
    },
    cellNowPriceStyles: {
        color: 'red',
        fontSize: 12,
    },
    cellOldPriceStyles: {
        color: '#f6f6f6',
        marginBottom: 5,
    },
})

export default MyHomeView