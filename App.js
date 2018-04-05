/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.table} >
          <Text style={styles.tableText}>
          Now Playing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.table} >
          <Text style={styles.tableText}>
          Upcoming Movies
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  table: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
  },
  tableText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
});
