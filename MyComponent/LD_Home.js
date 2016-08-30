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
} from 'react-native';
import Home_detailsView_dd from './Home_detailsView_dd'
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');
class MyHomeView extends Component {

    constructor(props) {
        super(props);
        var getDataBlob = (dataBlob, sectionID)=>dataBlob[sectionID];
        var getRowData = (dataBlob, sectionID, rowID)=>dataBlob[sectionID + ':' + rowID];
        this.state = {
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
            <View style={styles.BigViewStyles}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>this.renderRowView(rowData)}
                    renderSectionHeader={()=><View><Text>就是测试</Text></View>}
                    contentContainerStyle={styles.upListViewStyles}
                />
            </View>
        )
    }
    renderRowView(rowData){
        return <TouchableOpacity onPress={()=>this.pushTheDetails()}><View><Text>{rowData.productName}</Text></View></TouchableOpacity>
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
                var dataBlob = {}, sectionIDs = [], rowIDs = [];
                dataBlob[0] = ' ';
                sectionIDs.push(0);
                rowIDs[0] = [];
                for (var i = 0; i < dataArr.length; i++) {
                    rowIDs[0].push(i);
                    dataBlob[0+':'+i] = dataArr[i];
                }
                this.setState({
                    homeProductArr: jsonData.data,
                    dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }


}
const styles = StyleSheet.create({
    bigViewStyles: {
        flex:1,
        // position:'absolute',
        // marginTop: 0,
        // marginLeft:0,
        // marginRight:0,
        // marginBottom:0,
        backgroundColor:'yellow',
    },
    upListViewStyles:{
        // width: width,
        // height: 200,
        flex:1,
        backgroundColor:'green',
        flexDirection:'column',
        flexWrap:'wrap'
    }
})

export default MyHomeView