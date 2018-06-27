import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, ListItem, Text, Icon, Left, Right } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const counties = [
  'Antrim',
  'Armagh',
  'Carlow',
  'Cavan',
  'Clare',
  'Cork',
  'Derry',
  'Donegal',
  'Down',
  'Dublin',
  'Fermanagh',
  'Galway',
  'Kerry',
  'Kildare',
  'Kilkenny',
  'Laois',
  'Leitrim',
  'Limerick',
  'Longford',
  'Louth',
  'Mayo',
  'Meath',
  'Monaghan',
  'Offaly',
  'Roscommon',
  'Sligo',
  'Tipperary',
  'Tyrone',
  'Waterford',
  'Westmeath',
  'Wicklow',
  'Wexford',
];

/**
* @class TwSettingsView
* display settings screen
*/
export class TwFavoriteView extends React.Component {
  static navigationOptions = () => ({
    title: 'Favorite Counties',
  });

  /**
  * @function render
  * renders view
  */
  render() {
    const { favoriteCounties, toggleFav } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <ScrollView>
          <List>
            {counties.map((county) => {
              const isSelected = !(!favoriteCounties.find(x => x === county));
              return (
                <ListItem
                  selected={isSelected}
                  key={county}
                  onPress={() => toggleFav(county)}
                >
                  <Left>
                    <Text>{county}</Text>
                  </Left>
                  <Right>
                    {isSelected && (<Icon name="checkmark" />)}
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </ScrollView>
      </View>
    );
  }
}

TwFavoriteView.propTypes = {
  screenProps: PropTypes.shape({
    favoriteCounties: PropTypes.arrayOf(PropTypes.string),
    toggleFav: PropTypes.func,
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
