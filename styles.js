import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
    fontWeight: '700',
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
    alignSelf: 'stretch',
    fontSize: 18,
    color: '#FFF',
    padding: 10,
    alignItems: 'stretch',
    textAlign: 'center',	
  },
  page: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 5,
    textAlign: 'center',	
    width: '30%',
  },
  genre: {
    fontSize: 13,
    color: '#999',
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
});