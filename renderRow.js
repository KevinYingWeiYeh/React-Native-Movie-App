import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ListView,
} from 'react-native';
import { Icon } from 'native-base';

export default function renderRow(item) {
  const genre = item.genre_ids && this.state.genres ? item.genre_ids.map(ele => this.state.genres[ele]).join(', ') : ''
  return (
    <TouchableHighlight onPress={this.pressRow.bind(this,item)} underlayColor='#ddd'>
      <View style={styles.feed}>
        <Image source={{uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path }} style={{ height: 60, width: 60,}} /> 
        <View style={{paddingLeft: 5, width: '70%'}}>
          <Text style={styles.feedText}>{item.title}</Text>
          <Text style={styles.genre}>{genre}</Text>
        </View>
        <View>
          <Text>
            <Icon ios='ios-eye' android="md-eye" style={{fontSize: 15, color: '#000'}}/>
            {Math.round(item.popularity)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}