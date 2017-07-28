/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import QRScan from './app/src/qrscan.component';
import Unpaid from './app/src/unpaid.component';
import Login from './app/src/login.component';
import Detail from './app/src/detail.component';

class App extends Component {
  render() {
    return (
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
        <Scene key="root" >
          <Scene key="Login" component={Login} title="Login" initial={true} sceneStyle={styles.scene}/>
          <Scene key="Home" component={QRScan} title="QRScan" sceneStyle={styles.scene}/>
          <Scene key="Unpaid" component={Unpaid} title="Unpaid" sceneStyle={styles.scene}/>
          <Scene key="Detail" component={Detail} title="Detail" sceneStyle={styles.scene}/>
        </Scene>
      </Router>
    );
  }
}
AppRegistry.registerComponent('QRScan', () => App);
const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#A82010', // changing navbar color
  },
  navTitle: {
    color: 'white', // changing navbar title color
  },
  scene: {
    paddingTop: 51,
  }
})