import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
/*
 * StyleSheet
 * textInput for search bar style
 * textBar between Title, Notice and Location
*/
const styles = StyleSheet.create({
  container: {
    borderWidth: 1.0,
    backgroundColor: 'rgba(247,247,247,1.0)',
    padding: 40,
    height: 44,
    flexDirection: 'column'

  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: '#cecece',
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
    marginHorizontal: 4

  },
  top: {
    height: 25,
    backgroundColor: 'transparent',
    borderRadius: 4,
    justifyContent: 'space-between',
    flex: 2,
    flexDirection: 'row',
    fontWeight: 'bold'

  },
  title: {
    height: 25,
    backgroundColor: 'steelblue',
    fontWeight: 'bold'

  },
  text1: {
    height: 28,
    backgroundColor: 'skyblue',

  },
  text2: {
    backgroundColor: 'powderblue',

  },

});
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
  /**
  * @function render
  */
  render() {
    const props = this.props;
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          // onChangeText={(text) => this.filterSearch(text)}
        />
        {props.data.map((item) => {
          console.log(item.TITLE);
          return (
            <View>
              <View style={styles.top} />
              <Text style={styles.title} >{item.TITLE} </Text>
              <Text style={styles.text1} > {item.LOCATION} </Text>
              <Text style={styles.text1} > {item.NOTICETYPE} </Text>
              <Text style={styles.text2} > {item.DESCRIPTION} </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
