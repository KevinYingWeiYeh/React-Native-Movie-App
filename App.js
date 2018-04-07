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
      playingTotalPage: null,
      upcomingTotalPage: null,
    }
    this.showButton = this.showButton.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  componentDidMount(){
    this.movieFetch();
  }

  movieFetch() {
    var page = this.state.mainButton === 'Now Playing' ? this.state.playingPage : this.state.upcomingPage;
    var url = this.state.mainButton === 'Now Playing'
        ? 'https://api.themoviedb.org/3/movie/now_playing?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page='
        : 'https://api.themoviedb.org/3/movie/upcoming?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-US&page=';
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
      this.setState({mainButton:'Now Playing'}, () => this.movieFetch() )
    } else {
      this.setState({mainButton: 'Upcoming Movies'}, () => this.movieFetch() )
    }
  }

  pageChange(state){
    if(this.state.mainButton === 'Now Playing') {
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
        <View style={{flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
          <TouchableHighlight 
            style={ this.state.mainButton === 'Now Playing' ? styles.tableActive : styles.table}
            onPress={this.showButton.bind(this,'Now Playing')}
            underlayColor='#ddd'
          >
            <Text style={ this.state.mainButton === 'Now Playing' ? styles.tableTextActive : styles.tableText }>
            Now Playing
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={ this.state.mainButton === 'Upcoming Movies' ? styles.tableActive : styles.table}
            onPress={this.showButton.bind(this,'Upcoming Movies')}
            underlayColor='#ddd' 
          >
            <Text style={ this.state.mainButton === 'Upcoming Movies' ? styles.tableTextActive : styles.tableText }>
            Upcoming Movies
            </Text>
          </TouchableHighlight>
        </View>
        // Movie List
        <ListView
          style={{marginTop:5}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
          // NextPage Buttons 
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
              this.state.mainButton === 'Now Playing' 
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
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  tableActive: {
    width: '50%',
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },
  table: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#48BBEC',
    borderWidth: 1,
  },
  tableTextActive: {
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center',
  },
  tableText: {
    fontSize: 18,
    color: '#48BBEC',
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
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    borderRadius: 30,
    margin: 5,
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