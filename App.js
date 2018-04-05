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
  TouchableHighlight,
  ActivityIndicator,
  Image,
  ListView,
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={ 
      isLoading: true,
      mainButton: 'Now Playing',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
  }

  componentDidMount(){
    this.movieFetch('Now Playing',1)
  }

  movieFetch(mainButton, page) {
    return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page=' + page)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource
            .cloneWithRows(responseJson.results)
      })
    })
  }

  renderRow(item) {
    return (
      <View style={styles.feed}>
          <Image source={{uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path }} style={{ height: 48, width: 48,}} /> 
          <View style={{
            paddingLeft: 5
          }}>
          <Text style={styles.feedText}>
            {item.title}
          </Text>
          <Text >
            Popularity: {Math.round(item.popularity)}
          </Text>
          </View>
      </View>
    )
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{
          flex:1,
          justifyContent: 'center'
        }}
        >
          <ActivityIndicator
            size='large'
            animating={true}
          />
        </View>
      )
    }
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
          <ListView
            style={{marginTop: 5}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
        <Text style={{marginTop: 5}}>
        <View style={styles.button}>
          <Text style={styles.tableText}>
            LastPage
          </Text>
        </View>
        <Text>  </Text>
        <View  style={styles.button}>
          <Text style={styles.tableText}>
            NextPage
          </Text>
        </View>
        </Text>
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
  feed: {
    padding : 5,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
  },
  feedText: {
    fontSize: 22,
    color: '#000',
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 10,
  }
});
