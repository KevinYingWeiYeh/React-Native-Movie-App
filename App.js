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
  Navigator,
} from 'react-native';
import { Icon } from 'native-base';


type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={ 
      isLoading: true,
      mainButton: 'Now Playing',
      dataSource: ds.cloneWithRows([]),
      playingPage: 1,
      upcomingPage: 1,
      playingTotalPage: 0,
      upcomingTotalPage: 0,
    }
    this.showButton = this.showButton.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  componentDidMount(){
    this.movieFetch();
  }

  movieFetch() {
    var page = this.state.mainButton === 'Now Playing' ? this.state.playingPage : this.state.upcomingPage
    var url = this.state.mainButton === 'Now Playing' 
        ? 'https://api.themoviedb.org/3/movie/now_playing?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page='
        : 'https://api.themoviedb.org/3/movie/upcoming?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page='
    return fetch(url + page)
      .then((response) => response.json())
      .then((responseJson) => {
        if(this.state.mainButton === 'Now Playing') {
          this.setState({
          isLoading: false,
          dataSource: this.state.dataSource
            .cloneWithRows(responseJson.results),
          playingTotalPage: responseJson.total_pages
          })
        } else {
          this.setState({
          isLoading: false,
          dataSource: this.state.dataSource
            .cloneWithRows(responseJson.results),
            upcomingTotalPage: responseJson.total_pages
          })
        }
      })
  }

  showButton(button){
    if(button === 'Now Playing') {
      this.setState({mainButton:'Now Playing'}, () => this.movieFetch(this.state.mainButton,this.state.playingPage) )
    } else {
      this.setState({mainButton: 'Upcoming Movies'}, () => this.movieFetch(this.state.mainButton,this.state.upcomingPage) )
    }
  }

  pageChange(page){

  }

  renderRow(item) {
    return (
      <View style={styles.feed}>
          <Image source={{uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path }} style={{ height: 48, width: 48,}} /> 
          <View style={{
            paddingLeft: 5,
            width: '70%'
          }}>
            <Text style={styles.feedText}>
              {item.title}
            </Text>
            <Text >
              <Icon ios='ios-heart' android="md-heart" style={{fontSize: 15, color: 'red'}}/>
              {Math.round(item.popularity)}
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'right', color: 'blue'}}> View </Text>
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
        <TouchableHighlight 
          style={styles.table}
          onPress={this.showButton.bind(this,'Now Playing')}
          underlayColor='#ddd'
        >
          <Text style={ this.state.mainButton === 'Now Playing' ? styles.tableTextActive : styles.tableText }>
          Now Playing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.table}
          onPress={this.showButton.bind(this,'Upcoming Movies')}
          underlayColor='#ddd' 
        >
          <Text style={ this.state.mainButton === 'Upcoming Movies' ? styles.tableTextActive : styles.tableText }>
          Upcoming Movies
          </Text>
        </TouchableHighlight>
        <ListView
          style={{marginTop:5}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <TouchableHighlight
            style={styles.table}
           >
            <Text style={styles.buttonText}>
              LastPage
            </Text>
          </TouchableHighlight >
          {
            this.state.mainButton === 'Now Playing' 
              ? <Text style={styles.page}> Page: {this.state.playingPage} / {this.state.playingTotalPage}</Text>
              : <Text style={styles.page}> Page: {this.state.upcomingPage} / {this.state.upcomingTotalPage}</Text>
          }
          <TouchableHighlight
            style={styles.table}
           >
            <Text style={styles.buttonText}>
              NextPage
            </Text>
          </TouchableHighlight >
        </View>
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
    borderRadius: 10,
  },
  tableText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  tableTextActive: {
    fontSize: 22,
    color: '#000',
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
    fontSize: 18,
    color: '#000',
    paddingBottom: 5,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    alignSelf: 'stretch',
    fontSize: 18,
    color: '#FFF',
    padding: 10,
    alignItems: 'center',
  },
  page: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 5,
  },
});
