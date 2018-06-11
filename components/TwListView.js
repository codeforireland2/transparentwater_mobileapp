import React from 'react';
import PropTypes from 'prop-types';
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
    flexDirection: 'column',

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
    backgroundColor: 'steelblue',
    fontWeight: 'bold',

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
  static navigationOptions = () => ({
    header: null,
  });

  /**
  * @function render
  */
  render() {
    const props = this.props.screenProps;
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          // onChangeText={(text) => this.filterSearch(text)}
        />
        {props.data.map(item =>
          // console.log(item.TITLE);
          (
            <View key={item.OBJECTID}>
              <View style={styles.top} />
              <Text style={styles.title} >{item.TITLE} </Text>
              <Text style={styles.text1} > {item.LOCATION} </Text>
              <Text style={styles.text1} > {item.NOTICETYPE} </Text>
              <Text style={styles.text2} > {item.DESCRIPTION} </Text>
            </View>
          ))}
      </ScrollView>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

TwListView.propTypes = {
  screenProps: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      OBJECTID: PropTypes.number,
      WORKTYPE: PropTypes.string,
      TITLE: PropTypes.string,
      STARTDATE: PropTypes.number,
      ENDDATE: PropTypes.number,
      CONTACTDETAILS: PropTypes.string,
      AFFECTEDPREMISES: PropTypes.string,
      TRAFFICIMPLICATIONS: PropTypes.string,
      DESCRIPTION: PropTypes.string,
      STATUS: PropTypes.string,
      GLOBALID: PropTypes.string,
      APPROVALSTATUS: PropTypes.string,
      LOCATION: PropTypes.string,
      PRIORITY: PropTypes.string,
      COUNTY: PropTypes.string,
      REFERENCENUM: PropTypes.string,
      PROJECTNUMBER: PropTypes.string,
      PROJECT: PropTypes.string,
      LAT: PropTypes.number,
      LONG: PropTypes.number,
      NOTICETYPE: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
  }).isRequired,
};
