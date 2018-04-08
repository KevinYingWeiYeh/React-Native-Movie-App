import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Modal,
} from 'react-native';
import { Icon } from 'native-base';
import styles from './styles.js'


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
							Voter Rate: {item.vote_average === 0 ? 'TBA' : item.vote_average}
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