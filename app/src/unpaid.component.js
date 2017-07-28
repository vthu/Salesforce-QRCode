import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';


import { NavigationActions } from 'react-navigation';
const background = require("../image/download.jpg");
const success_icon = require("../image/paid.jpg");
import Container from '../3rd/components/Container';
import Button from '../3rd/components/Button';
import global from '../global/global';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DefaultAnimation,
} from 'react-native-popup-dialog';
export default class Unpaid extends Component {
    static navigationOptions = {
        title: 'Unpaid',
        headerTintColor: "white",
        headerStyle: {
         backgroundColor:"#B00787"
       }
    };
    constructor(props) {
        super(props);
    }
    paid = () =>{
        const params = this.props;
        var url = params.url + '/?id=' + params.qrID;
        Actions.Detail({url: url, from:'unpaid'});
        return;
    }
    unpaid = () =>{
        const params = this.props;
        var url = params.url + '/?id=' + params.qrID + '&unPaid=yes';
        fetch(url);
        url = params.url + '/services/apexrest/api/registration/' + params.qrID;
        fetch(url).then((resp) => resp.json()).then((jsonData) => {
            if(jsonData.attended == true) {
                this.popupDialog.show();
            }
            else{
                alert("Failed to mark");
                Actions.pop();
            }
            return;
        }).done();
    }
    
    next_scan = () =>{
        Actions.pop();
    }
    render() {
        const params = this.props;
        return (
            <View style={styles.container}>
                <Image
                    source={background}
                    style={styles.backgroundImage}
                    resizeMode="stretch">
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <Text>{params.Contact_name}</Text>
                            <Text>{params.Email} </Text>
                            <Text>{params.Address} </Text>
                            <Text>{params.Remaining_Amount}</Text>
                            <Text>{params.Status}</Text>
                        </View>
                        <TouchableOpacity activieOpacity={.5} onPress={this.unpaid}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Mark attendance only</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activieOpacity={.5} onPress={this.paid}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Make payment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <PopupDialog dialogTitle={<DialogTitle title="Marked successfully" />} ref={(popupDialog) => { this.popupDialog = popupDialog; }} dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }>
                        <View style={styles.success_image}>
                            <Image
                                source={success_icon}
                                style={styles.success_popup}
                                resizeMode="stretch">
                            </Image>
                            <TouchableOpacity activieOpacity={.5} onPress={this.next_scan}>
                                <View style={styles.next_scan}>
                                    <Text>Scan another code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </PopupDialog>
                </Image>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
	    flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: 500,
        height: 550,
    },
    success_popup: {
        flex: 1,
        resizeMode: 'contain', // or 'stretch'
        marginHorizontal: 30,
        width: 300,
        height: 200,
        alignItems: "center",
    },
    next_scan: {
        alignItems: "center",
        backgroundColor: "#d73352",
        marginHorizontal: 110,
        height: 40,
        width: 150,
        justifyContent:"center"
    },
    success_image: {
        flex: 1,
    },
    background: {
        width: null,
        height: null
    },
    wrapper: {
        paddingHorizontal: 15,
    },
    inputWrap:{
        flexDirection:"column",
        marginVertical: 10,
        marginBottom:50,
        height: 40,
        backgroundColor: "transparent"
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#FFF'
    },
    iconWrap:{
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d73352"
    },
    icon: {
        width: 20,
        height: 20,
    },
    button: {
        backgroundColor: "#d73352",
        paddingVertical: 15,
        marginVertical: 15,
        width: 300,
        alignItems: "center",
        justifyContent:"center"
    },
    button_ok:{
        width: 100,
        height: 30,
        alignItems: "center",
        justifyContent:"center",
        marginHorizontal: 100,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
    },
    forgotPasswordText: {
        color: "#FFFFFF",
        backgroundColor: "transparent",
        textAlign: "center"
    }
});