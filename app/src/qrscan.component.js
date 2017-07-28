import React from 'react';
import{
    Alert,
} from 'react-native'
import QRCodeScreen from '../3rd/QRCodeScreen';
import Detail from './detail.component';
import global from '../global/global';
import Unpaid from './unpaid.component';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
const timer = require('react-native-timer');
var baseURL = null;
export default class QRScan extends QRCodeScreen {
    static navigationOptions = {
        title: 'QRCode',
        headerTintColor: "white",
        headerStyle: {
         backgroundColor:"#B00787"
       }
    };

    constructor(props) {
        super(props);
        
        const params = this.props;
        if(params.instance_url == undefined)
        {
            alert("Can't find correct login info. Try login first.");
            navigate('Login');
            return;
        }
        var get_url = params.instance_url + '/services/apexrest/api/getURL';
        var auth_data = params.token_type + ' ' + params.access_token;
        fetch(get_url, {
            method: "GET",
            headers: { "Authorization": auth_data }
        }).then((resp) => resp.json()).then(jsonData => {
            jsonData = jsonData.replace("http:", "https:");
            baseURL = jsonData;
            if(baseURL)
                global.scanFlag = false;
            else
            {
                alert("Can't find correct login info. Try login first.");
                navigate('Login');
                return;
            }
        }).done();
    }
    
    onBarCodeRead(result) {
        if (!global.scanFlag) {
            global.scanFlag = true;
            var qr_id = result.data; //might make the url with form
            this.getUserInfo(qr_id);
        }
    }
    getUserInfo(qrId) {
        var qr_id = qrId;
        var my_url = baseURL + '/services/apexrest/api/registration/' + qr_id;
        fetch(my_url).then((resp) => resp.json()).then((jsonData) => {
            if(jsonData.status.includes('Registered')) {
                setTimeout(() => {
                    global.scanFlag = false;
                }, 3000);
                global.camEnabled = false;
                Actions.Unpaid({
                    Contact_name: 'Contact Name: '+jsonData.name,
                    Email: 'Email: '+jsonData.email,
                    Address: 'Address: '+jsonData.address,
                    Phone: 'Phone: '+jsonData.phone,
                    Remaining_Amount: 'Remaining_Amount: '+jsonData.Remaining_Amount,
                    Status: 'Status: '+'UnPaid',
                    url: baseURL,
                    qrID: qr_id,
                });
                return;
            } else {
                Alert.alert(
                    'Already Paid',
                    'Already paid and get ready for next sign',
                    [
                        {text: 'Cancel'},
                        {text: 'OK'},
                    ]
                );
                setTimeout(() => {
                    global.scanFlag = false;
                }, 3000);
            }
        }).done();
    }
}