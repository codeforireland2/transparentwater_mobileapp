import React from 'react';
import { ScrollView, Text } from 'react-native';

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
      <ScrollView>
        {props.data.map((item) => {
          console.log(item.TITLE);
          return (<Text key={item.OBJECTID}>{item.TITLE}</Text>);
        })}
      </ScrollView>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
