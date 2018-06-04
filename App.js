import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text, Spinner } from 'native-base';
import { Font } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { TwMapView } from './components/TwMapView';
import { TwItemView } from './components/TwItemView';
import { TwListView } from './components/TwListView';
import { getInitialData } from './utils/api';


const styles = StyleSheet.create({
  loader: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
})

/**
* @class App
* Main View of the application showing tabs for the list and mapview
*/
class App extends React.Component {
  constructor(options) {
    super(options);
    this.state = {
      data: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    // Load Fonts
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }).then(() => this.setState({ fontLoaded: true }));

    // Load Initial Data
    getInitialData().then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  _refreshData = () => {
    this.setState({ refreshing: true });
    getInitialData().then((data) => {
      this.setState({
        data: data,
        refreshing: false,
      });
    });
  }

  render() {
    const screenProps = {
      data: this.state.data,
      refreshing: this.state.refreshing,
      refreshData: this._refreshData,
    };
    if(!screenProps.data.length || !this.state.fontLoaded) {
      return (
        <View style={styles.loader}>
          <Spinner color='grey' />
          <Text> Fetching Data... </Text>
        </View>
      )
    }
    return (<Navigation screenProps={screenProps} />);
  }
}

const ListStack = createStackNavigator({
  List: { screen: TwListView },
  Details: { screen: TwItemView },
});

const MapStack = createStackNavigator({
  List: { screen: TwMapView },
  Details: { screen: TwItemView },
});

const Navigation = createBottomTabNavigator(
  {
    ListView: {
      screen: ListStack,
    },
    MapView: {
      screen: MapStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ListView') {
          iconName = 'alert';
        } else if (routeName === 'MapView') {
          iconName = 'map';
        }
        return <Icon name={iconName} size={25} style={{ color: tintColor }} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default App;
