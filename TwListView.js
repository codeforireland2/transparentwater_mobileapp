import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.0,
    backgroundColor: 'rgba(247,247,247,1.0)',
    paddingTop: 70,
    padding: 40,
    height: 44,
    flexDirection: 'column'

  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: 'skyblue',
    fontWeight: 'bold'
  },
  textBar: {
    height: 10,
    backgroundColor: 'powderblue'
  }

});
// disabled for now, at least until we figure out if this
// will have state or not
/* eslint-disable react/prefer-stateless-function */
/**
* @class TwListView
* display of the data in a list
*/
export class TwListView extends React.Component {
  /**
  * @function render
  */
  render() {
    const props = this.props;
    return (
      <ScrollView style={styles.container}>
        <TextInput style={styles.textInput} />
        {props.data.map((item) => {
          console.log(item.TITLE);
          console.log(item.LOCATION);
          console.log(item.NOTICETYPE);
          return (
            <View>
              <View style={styles.textBar} />
              <Text style={{ fontWeight: 'bold' }}>{item.TITLE} </Text>
              <Text >{item.NOTICETYPE} </Text>
              <Text >{item.LOCATION} </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
