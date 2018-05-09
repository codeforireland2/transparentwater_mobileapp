import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

// disabled for now, at least until we figure out if this
// will have state or not
/* eslint-disable react/prefer-stateless-function */
export class TwListView extends React.Component {
  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        {props.data.map((item) => {
          console.log(item.TITLE);
          return (<Text key={item.OBJECTID}>{item.TITLE}</Text>);
        })}
      </View>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
