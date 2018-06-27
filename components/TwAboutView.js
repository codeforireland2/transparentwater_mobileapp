import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, CardItem, Body } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
* @class TwSettingsView
* display settings screen
*/
export class TwAboutView extends React.Component {
  static navigationOptions = () => ({
    title: 'About Us',
  });

  /**
  * @function render
  * renders view
  */
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <CardItem header>
            <Text>Transparent Water by Code for Ireland</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Code for Ireland follows in the footsteps of
                Code For America, which was founded in 2009.
                Like it, Code for Ireland has attracted
                technologists to get involved in developing
                solutions in and with the Irish
                government and its communities.
              </Text>
              <Text style={{ paddingTop: 10 }}>
                Learn more about Code for Ireland at codeforireland.com
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Developed by George Kemp, Antti Knutas, & Luke Kearney</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
