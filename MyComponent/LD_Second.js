import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ListView,
    Image,
    Text,
} from 'react-native';
class MyHomeView extends Component {
    render() {
        return (
            <View style={styles.bigViewStyles}>
                <Text>第二页</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bigViewStyles: {
        backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default MyHomeView
