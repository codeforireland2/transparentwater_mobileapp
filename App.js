import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { TwMapView } from './components/TwMapView';
import { TwListView } from './components/TwListView';
import { getInitialData } from './utils/api';


/**
* @class App
* Main View of the application showing tabs for the list and mapview
*/
class App extends React.Component {
  state = {
    data: [],
  }

  /**
   * @function componentDidMount
   * fetches our data from our api to be passed along to our screens
   */
  componentDidMount() {
    getInitialData().then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  /**
  * @function render
  * setting up the view
  */
  render() {
    const { data } = this.state;
    const screenProps = {
      data,
    };
    return (
      <RootNavigation screenProps={screenProps} />
    );
  }
}

const ListStack = createStackNavigator({
  List: { screen: TwListView },
});

const MapStack = createStackNavigator({
  Map: { screen: TwMapView },
});

const RootNavigation = createBottomTabNavigator(
  {
    ListView: {
      screen: ListStack,
    },
    MapScreen: {
      screen: MapStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
        case 'ListView':
          iconName = 'alert';
          break;
        case 'MapScreen':
          iconName = 'map';
          break;
        default:
          iconName = 'questions';
          break;
        }
        // TODO: Make this platform specific
        return <Ionicons name={`md-${iconName}`} size={25} style={{ color: tintColor }} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveColor: 'gray',
    },
  },
);

export default App;
