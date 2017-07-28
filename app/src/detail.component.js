import React, { Component } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    View, 
    WebView,
    Image,
    TouchableOpacity
} from 'react-native';
import global from '../global/global';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DefaultAnimation,
} from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
const success_icon = require("../image/paid.jpg");
var WEBVIEW_REF = 'webview';
export default class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',headerTintColor: "white",
        headerStyle: {
         backgroundColor:"#B00787"
       }
    };

    constructor(props) {
        super(props);
    }

    render() {
        const params = this.props;
        return (
            <View style={styles.allview}>
                <WebView
                    ref={WEBVIEW_REF}
                    source={{uri:  params.url }}
                    style={styles.webview}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    javaScriptEnabled={true}
                    startInLoadingState={false}/>
                <PopupDialog dialogTitle={<DialogTitle title="Marked successfully" />} ref={(popupDialog) => { this.popupDialog = popupDialog; }} dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }>
                    <View style={styles.success_image}>
                        <Image
                            source={success_icon}
                            style={styles.success_popup}>
                        </Image>
                        <TouchableOpacity activieOpacity={.5} onPress={this.next_scan}>
                            <View style={styles.next_scan}>
                                <Text>Scan another code</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>
            </View>
        );
    }
    reload() {
        this.refs[WEBVIEW_REF].reload();
    }
    componentDidMount() {
        this.reload();
    }
    componentWillUnmount() {
        global.scanFlag = false;
    }

    next_scan = () =>{
        Actions.pop({popNum: 2});
    }
    onNavigationStateChange(webViewState) {
        var cur_url = webViewState.url.toString();
        var catch_url = "registration";
        if(cur_url.includes(catch_url))
        {
            fetch(cur_url).then((resp) => resp.json()).then((jsonData) => {
                if(jsonData.attended == true)
                {
                    this.popupDialog.show();
                }
                else{
                    alert("Failed to mark");
                }
            }).done();
            this.refs[WEBVIEW_REF].stopLoading();
            return false;
        }
        return true;
    }
}
const styles = StyleSheet.create({
    success_popup: {
        flex: 1,
        resizeMode: 'contain',
        marginHorizontal: 30,
        width: 300,
        height: 200,
        alignItems: "center",
    },
    webview: {
        flex: 1,
    },
    allview: {
        flex: 1
    },
    success_image: {
        flex: 1,
    },
    next_scan: {
        alignItems: "center",
        backgroundColor: "#d73352",
        marginHorizontal: 110,
        height: 40,
        width: 150,
        justifyContent:"center"
    },
});