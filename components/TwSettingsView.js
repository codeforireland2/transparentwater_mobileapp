import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List, ListItem, Icon, Left, Right } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

/**
* @class TwSettingsView
* display settings screen
*/
export class TwSettingsView extends React.Component {
  static navigationOptions = () => ({
    title: 'Settings',
  });


  /**
  * @function render
  * renders the map and markers initially
  */
  render() {
    return (
      <View style={styles.container}>
        <List>
          <ListItem onPress={() => this.props.navigation.navigate('Favorite')}>
            <Left>
              <Text>Favorite Counties</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate('About')}>
            <Left>
              <Text>About Us</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}
