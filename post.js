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
  Modal,
} from 'react-native';
import { Icon } from 'native-base';

export default class Post extends Component<Props> {
  constructor(props){
    super(props);
    this.state ={ 
    }
  }

  render() {
  	if(this.props.state.item === null) {
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
    <Modal
   		style={styles.container}
      animationType="fade"
      transparent={false}
      visible={this.props.state.modalVisible}
      onRequestClose={() => {
        alert('Movie detial has been closed.');
      }}>
      <View style={{marginTop: 22, padding: 10}}>
          <TouchableHighlight
          	style={styles.button}
            underlayColor='#ddd'
            onPress={() => {
              this.props.close();
            }}>
          <Text style={styles.buttonText}>
            Close
          </Text>
        </TouchableHighlight>
      <Image source={{uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.state.item.poster_path }} style={{ height: '75%', width: '75%',}} /> 
     	{/*<Image source={{uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.state.item.backdrop_path }} style={{ height: '40%', width: '40%',}} /> */}
	      <View>
		      <Text>
		      	Movie Name: {this.props.state.item.title}
		      </Text>
		      <Text>
		      	Release Data: {this.props.state.item.release_date}
		      </Text>
		      <Text>
		      	Overview: {this.props.state.item.overview}
		      </Text>
	    	</View>
    	</View>
  	</Modal>
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
    fontSize: 18,
    color: '#FFF',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
});