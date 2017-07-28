import React, { Component } from 'react';
import {
  Picker,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const Item = Picker.Item;
import Detail from './detail.component';
import global from '../global/global';
const timer = require('react-native-timer');
import Spinner from 'react-native-loading-spinner-overlay';
const background = require("../image/download.jpg");
const lockIcon = require("../image/login1_lock.png");
const personIcon = require("../image/login1_person.png");
const clientIcon = require("../image/client_icon.png");
const secretIcon = require("../image/client_secret.png");
var _timer = 0;
export default class Login extends Component {
    constructor(props){
        super(props);
        var settings = {username: "",password:""};
        const SETTINGS_KEY = 'Settings';
        this.state = { visible: false,username: '', password: '',client_id: '3MVG9GiqKapCZBwGsSF.0TE2ORd7e9YmD7Z8IsNzwKosEsuGzSwL0f8WvAwkNhmwU_WeEU3_gK.uzqkHNW57R',client_secret: '5796342432333468743',web_url : '',isFailed: false,type_value:'Sandbox' };
        this.handleChange = this.handleChange.bind(this);
        AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
            settings = JSON.parse(settingsStr);
            this.setState({username: settings.username,password: settings.password,client_id: '3MVG9GiqKapCZBwGsSF.0TE2ORd7e9YmD7Z8IsNzwKosEsuGzSwL0f8WvAwkNhmwU_WeEU3_gK.uzqkHNW57R',client_secret: '5796342432333468743'});
        });
    }
    componentWillUnmount() {
        timer.clearTimeout(this);
    }
    static navigationOptions = {
        title: 'Login',
        headerTintColor: "white",
        headerStyle: {
         backgroundColor:"#B00787"
       }
    };
    login = () => {
        this.setState({visible: true}, () => timer.setTimeout(
            'hideMsg', () => this.setState({visible: false}), 10000
        ));
        var params = {
            grant_type: "password", 
            client_id: this.state.client_id,
            client_secret: this.state.client_secret,
            username: this.state.username,
            password: this.state.password
        };
        var formData = new FormData();
        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch("https://test.salesforce.com/services/oauth2/token", {
            method: "POST",
            body: formData
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.access_token) {
                global.instance_url = responseData.instance_url;
                global.token_type = responseData.token_type;
                global.access_token = responseData.access_token;
                global.username = this.state.username;
                global.password = this.state.password;
                const SETTINGS_KEY = 'Settings';
                const settingsObj = {username: this.state.username, password: this.state.password,client_id: this.state.client_id,client_secret: this.state.client_secret};
                AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj));

                this.setState({visible: false});
                timer.clearTimeout('hideMsg');
                Actions.Home({
                    instance_url : responseData.instance_url,
                    token_type: responseData.token_type,
                    access_token: responseData.access_token
                });
            } else {
                this.setState({isFailed: true});
                this.setState({visible: false});
                timer.clearTimeout('hideMsg');
            }
            clearTimeout();
        })
        .done();
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        var password_incorrect = '';
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FF0000'}} />
                </View>
                <Image
                    source={background}
                    style={styles.backgroundImage}
                    resizeMode="stretch"
                >
                <View style={styles.wrapper}>
                {this.state.isFailed && <View style={styles.inputWrap}><Text style={styles.incorrect}> Please insert correct username and password </Text></View>}
                   <Text>Username</Text>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image
                                source={personIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Username"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(username) => this.setState({username: username})}
                            value={this.state.username}
                        />
                    </View>
                   <Text>Password</Text>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image
                                source={lockIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(password) => this.setState({password: password})}
                            value={this.state.password}
                        />
                    </View>
                    {/* <Text>Client ID</Text>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image
                                source={clientIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Client ID"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(client_id) => this.setState({client_id: client_id})}
                            value={this.state.client_id}
                        />
                    </View> */}
                    {/* <Text>Client Secret</Text>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image
                                source={secretIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Client Secret"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(client_secret) => this.setState({client_secret: client_secret})}
                            value={this.state.client_secret}
                        />
                    </View> */}
                    <Text>Dropdown List</Text>
                    <View style={styles.inputWrap1}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.type_value}
                            onValueChange={(typ) => this.setState({type_value: typ})}
                            >
                            <Item label="Sandbox" value="Sandbox" />
                            <Item label="Production" value="Production" />
                        </Picker>
                    </View>
                    <TouchableOpacity activieOpacity={.5} onPress={this.login}>
                        <View style={styles.buttons}>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </Image>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: 800,
        height: 550,
        resizeMode: 'contain', // or 'stretch'
    },
    incorrect: {
        color: '#FF0000'
    },
    wrapper: {
        paddingVertical: 3,
        paddingHorizontal: 25,
        ...Platform.select({
            ios: {
                backgroundColor: 'transparent',
            },
            android: {
            },
        }),
    },
    inputWrap:{
        flexDirection:"row",
        marginVertical: 5,
        height: 40,
        width: 280,
    },
    inputWrap1:{
        flexDirection:"row",
        height: 100,
        width: 300,
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginVertical: 5,
            },
        }),
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#FFF'
    },
    iconWrap:{
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d73352"
    },
    icon: {
        width: 20,
        height: 20,
    },
    buttons: {
        backgroundColor: "#d73352",
        paddingVertical: 7,
        marginVertical: 7,
        width: 280,
        alignItems: "center",
        justifyContent:"center"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
    },
    forgotPasswordText: {
        color: "#FFFFFF",
        ...Platform.select({
            ios: {
            },
            android: {
                backgroundColor: "transparent",
            },
        }),
        textAlign: "center"
    },
    picker: {
        width: 150,
        ...Platform.select({
            ios: {
                height: 50,
                marginVertical: -50,
            },
            android: {
                
            },
        }),
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});