/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  ListView,
  Modal,
} from 'react-native';
import { Icon } from 'native-base';
import Post from './post.js'
import styles from './styles.js'
import renderRow from './renderRow.js'

export default class App extends Component<Props> {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={ 
      isLoading: true,
      isPlayingPressed: true,
      isOffLine: false,
      modalVisible: false,
      dataSource: ds.cloneWithRows([]),
      playingPage: 1,
      upcomingPage: 1,
      playingTotalPage: null,
      upcomingTotalPage: null,
      item: {},
    }
    this.pressTable = this.pressTable.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.pressRow = this.pressRow.bind(this);
    this.pressClose = this.pressClose.bind(this);
  }

  componentDidMount(){
    this.genersFetch();
    this.movieFetch();
  }

  genersFetch() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-U'
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let genres = {};
        genres = responseJson.genres.reduce((a,e) => {
          a[e.id] = e.name;
          return a;
        },{});
        this.setState({ genres : genres });
      })
      .catch(() => this.setState({isOffLine: true})) // Display no internet when fetching goes wrong 
  }

  movieFetch() {
    var page = this.state.isPlayingPressed ? this.state.playingPage : this.state.upcomingPage;
    var url = this.state.isPlayingPressed
      ? 'https://api.themoviedb.org/3/movie/now_playing?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page='
      : 'https://api.themoviedb.org/3/movie/upcoming?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page=';
    return fetch(url + page)
      .then((response) => response.json())
      .then((responseJson) => {
          if(!this.state.playingTotalPage && this.state.isPlayingPressed) {
            this.setState({
              isLoading: false,
              dataSource: this.state.dataSource
                .cloneWithRows(responseJson.results),
              playingTotalPage: responseJson.total_pages
            })
          } else if(!this.state.upcomingTotalPage && !this.state.isPlayingPressed) {
            this.setState({
              isLoading: false,
              dataSource: this.state.dataSource
                .cloneWithRows(responseJson.results),
              upcomingTotalPage: responseJson.total_pages
            })
          } else {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource
              .cloneWithRows(responseJson.results),
          })
        }
      })
      .catch(() => this.setState({isOffLine: true})) // Display no internet when fetching goes wrong 
  }

  pressTable(key){
    if(key === this.state.isPlayingPressed) {
      this.setState({isPlayingPressed: !this.state.isPlayingPressed}, () => this.movieFetch())
    }
  }

  pressRow(item){
    this.setState({item: item, modalVisible: !this.state.modalVisible})
  }

  pressClose(){
    this.setState({modalVisible: !this.state.modalVisible})
  }

  pageChange(state){
    if(this.state.isPlayingPressed) {
      if(this.state.playingPage < this.state.playingTotalPage && state === 'Last') {
        this.setState({ playingPage: ++this.state.playingPage }, () => this.movieFetch() )
      } else if(this.state.playingPage > 1 && state === 'Next') {
        this.setState({playingPage: --this.state.playingPage }, () => this.movieFetch() )
      }
    } else {
        if(this.state.upcomingPage < this.state.upcomingTotalPage && state === 'Last') {
        this.setState({ upcomingPage: ++this.state.upcomingPage }, () => this.movieFetch() )
      } else if(this.state.upcomingPage > 1 && state === 'Next') {
        this.setState({upcomingPage: --this.state.upcomingPage }, () => this.movieFetch() )
      }
    }
  }

  render() {
    if(this.state.isOffLine) {
      return (
        <View style={{flex:1,justifyContent: 'center', textAlign: 'center'}}>
          <Text> Unable to connect internet </Text>
        </View>
        )
    }
    if(this.state.isLoading) {
      return (
        <View style={{flex:1,justifyContent: 'center'}}>
          <ActivityIndicator size='large' animating={true}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Post state={this.state} close={this.pressClose}/>
        <View style={{flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
          <TouchableHighlight 
            style={ !this.state.isPlayingPressed ? styles.tableActive : styles.table}
            onPress={this.pressTable.bind(this,false)} 
            underlayColor='#ddd'
          >
            <Text style={ !this.state.isPlayingPressed ? styles.tableTextActive : styles.tableText }>
            Now Playing
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={ this.state.isPlayingPressed ? styles.tableActive : styles.table}
            onPress={this.pressTable.bind(this,true)}
            underlayColor='#ddd' 
          >
            <Text style={ this.state.isPlayingPressed ? styles.tableTextActive : styles.tableText }>
            Upcoming Movies
            </Text>
          </TouchableHighlight>
        </View>
          <ListView
            style={{marginTop:5}}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={renderRow.bind(this)} />
        <View style={{flexDirection:'row', flexWrap:'wrap', borderColor: '#EEE', borderTopWidth: 1}}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.pageChange.bind(this,'Next')}
            underlayColor='#ddd'
           >
            <Text style={styles.buttonText}>
              LastPage
            </Text>
          </TouchableHighlight >
            <Text style={styles.page}>
            {
              this.state.isPlayingPressed 
                ? <Text > Page: {this.state.playingPage} / {this.state.playingTotalPage}</Text>
                : <Text > Page: {this.state.upcomingPage} / {this.state.upcomingTotalPage}</Text>
            }
            </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.pageChange.bind(this,'Last')}
            underlayColor='#ddd'
           >
            <Text style={styles.buttonText}>
              NextPage
            </Text>
          </TouchableHighlight >
        </View>
      </View>
    )
  }
}
  