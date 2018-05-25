import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1.0,
    flex: 10,
    backgroundColor: 'rgba(247,247,247,1.0)',
    paddingTop: 60,
    padding: 60,
    height: 44
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
        {props.data.map((item) => {
          console.log(item.LOCATION);
          return (<Text key={item.OBJECTID}>{item.LOCATION}</Text>);
        })}
      </ScrollView>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
