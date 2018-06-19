import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { TwMapView } from './components/TwMapView';
import { TwListView } from './components/TwListView';
import { TwItemView } from './components/TwItemView';
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
  Item: { screen: TwItemView },
});

const MapStack = createStackNavigator({
  Map: { screen: TwMapView },
  Item: { screen: TwItemView },
});

/**
 * @function
 * renders mapIcon
*/
function MapIcon({ tintColor }) {
  return <Ionicons name="md-map" size={25} style={{ color: tintColor }} />;
}

MapIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

/**
 * @function
 * renders listIcon
*/
function ListIcon({ tintColor }) {
  return <Ionicons name="md-alert" size={25} style={{ color: tintColor }} />;
}

ListIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ListIcon,
};

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: MapIcon,
};

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
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveColor: 'gray',
    },
  },
);

export default App;
