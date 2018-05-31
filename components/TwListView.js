import React from 'react';
import { StyleSheet, FlatList, Text, TextInput, View } from 'react-native';
/*
 * StyleSheet
 * textInput for search bar style
 * textBar between Title, Notice and Location
*/
const styles = StyleSheet.create({
  textInput: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: '#cecece',
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  top: {
    height: 25,
    backgroundColor: 'transparent',
    borderRadius: 4,
    justifyContent: 'space-between',
    flex: 2,
    flexDirection: 'row',
  },
  title: {
    height: 25,
    fontWeight: 'bold',
    backgroundColor: 'steelblue',

  },
  text1: {
    height: 28,
    fontWeight: 'bold',
    backgroundColor: 'skyblue',

  },
  text2: {
    backgroundColor: 'powderblue',
    fontWeight: 'bold'
  },

});

TwListItem = (item) => {
  return (
    <View>
      <View style={styles.top} />
      <Text style={styles.title} >{item.TITLE} </Text>
      <Text style={styles.text1} > {item.LOCATION} </Text>
      <Text style={styles.text1} > {item.NOTICETYPE} </Text>
      <Text style={styles.text2} > {item.DESCRIPTION} </Text>
    </View>
  )
}

// disabled for now, at least until we figure out if this
// will have state or not
/* eslint-disable react/prefer-stateless-function */
/**
* @class TwListView
* display of the data in a list
* the title is in bold
* the View has a bar
*/
export class TwListView extends React.Component {

  _keyExtractor =  (item, index) => item.OBJECTID.toString();

  /**
  * @function render
  */
  render() {
    const { data } = this.props;
    return (
      <View style={{flex: 1}}>
        <TextInput 
          style={styles.textInput}
          // onChangeText={(text) => this.filterSearch(text)}
        />
        <FlatList 
          data={data}
          renderItem={({item}) => TwListItem(item)}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
