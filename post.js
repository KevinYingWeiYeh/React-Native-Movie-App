import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
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
  	const item = this.props.state.item;
    return (
    <Modal
   		style={styles.container}
      animationType="fade"
      transparent={false}
      visible={this.props.state.modalVisible}
      onRequestClose={() => {
        alert('Movie detial has been closed.');
      }}>
      <View style={{marginTop: 22, padding: 5}}>
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
	      <View style={{flexDirection:'row', flexWrap:'wrap', borderColor: '#EEE', borderTopWidth: 1, borderBottomWidth: 1, padding: 5}}>
	      <Image  source={{
	  							uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path 
	  						}} 
	  						style={{ height: 200, width: '50%'}} /> 
					<View style={{backgroundColor: '#EEE', width: '50%'}}>
						<Text style={styles.titleHeadLine}>
						{item.title}
						</Text>
						<Text style={styles.titleText}>
							Voter Rate: {item.vote_average === 0 ? 'Not open to rate yet' : item.vote_average}
						</Text>
						<Text style={styles.titleText}>
							Relese Date: {item.release_date}
						</Text>
					</View>
	  		</View>
	  		<View>
	  			<Text style={{fontSize: 22}}>
	  			OverView:
	  			</Text>
	  			<Text style={styles.feedText}>
	  			{item.overview}
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
  titleHeadLine: {
  	fontSize: 20,
  	fontWeight: 'bold',
    color: '#000',
    padding: 10,
    textAlign: 'center',	
  },
  titleText:{
  	fontSize: 18,
    color: '#000',
    padding: 5,
    textAlign: 'center',
  },
  feedText: {
    fontSize: 18,
    color: '#000',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
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
    alignItems: 'stretch',
    alignSelf: 'center',
  },
});