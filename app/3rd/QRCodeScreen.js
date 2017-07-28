'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View, Text,
  TouchableOpacity,
  VibrationIOS,
} from 'react-native';

import global from '../global/global';
import Camera from 'react-native-camera';

var gflag = false;
export default class QRCodeScreen extends Component {
  static defaultProps = {
    cancelButtonVisible: false,
    cancelButtonTitle: null,
    onSucess: null,
    onCancel: null,
  }
  
  constructor(props) {
    super(props);
    gflag = true;
    global.camEnabled = true;
  }
  onPressCancel() {
    requestAnimationFrame(() => {
      this.props.navigator.pop();
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    });
  }

  onBarCodeRead(result) {
    if (!gflag) {
      return false;
    }

    gflag = false;
    setTimeout(() => {
      VibrationIOS.vibrate();
      if (this.props.cancelButtonVisible) {
        this.props.navigator.pop();
      }
      if (this.props.onSucess) {
        this.props.onSucess(result.data);
      }
      gflag = true;
    }, 1000);
    return true;
  }

  render() {
    var cancelButton = null;
    if (this.props.cancelButtonVisible) {
      cancelButton = <CancelButton onPress={this.onPressCancel} title={this.props.cancelButtonTitle} />;
    }
    if(!global.camEnabled)
    {
      return ( <View style={{flex:1, flexDirection: 'column'}}/> );
    }
    return (
      <View>
        <Camera onBarCodeRead={this.onBarCodeRead.bind(this)} style={styles.camera}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
          </View>
          {cancelButton}
        </Camera>
      </View>
    );
  }
}

class CancelButton extends Component {
  render() {
    return (
      <View style={styles.cancelButton}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.cancelButtonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    height: 568,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },

  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
});