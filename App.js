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
import { TwFavoriteView } from './components/TwFavoriteView';
import { TwAboutView } from './components/TwAboutView';
import { TwSettingsView } from './components/TwSettingsView';
import { getInitialData } from './utils/api';
import { setSettings, getSettings } from './utils/localstorage';


/**
* @class App
* Main View of the application showing tabs for the list and mapview
*/
class App extends React.Component {
  state = {
    data: [],
    favoriteCounties: [],
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

    getSettings().then((settings) => {
      this.setState(state => Object.assign({}, state, settings));
    });
  }

  /**
   * @function toggleFav
   * toggles a favirote county
   */
  toggleFav(county) {
    this.setState((prevState) => {
      if (prevState.favoriteCounties.indexOf(county) > 0) {
        return {
          favoriteCounties: prevState.favoriteCounties.filter(x => x !== county),
        };
      }
      prevState.favoriteCounties.push(county);
      setSettings({
        favoriteCounties: prevState.favoriteCounties,
      });
      return {
        favoriteCounties: prevState.favoriteCounties,
      };
    });
  }

  /**
  * @function render
  * setting up the view
  */
  render() {
    const { data, favoriteCounties } = this.state;
    const screenProps = {
      data,
      favoriteCounties,
      toggleFav: county => this.toggleFav(county),
    };
    return (
      <RootNavigation screenProps={screenProps} />
    );
  }
}

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

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: MapIcon,
};

const ListStack = createStackNavigator({
  List: { screen: TwListView },
  Item: { screen: TwItemView },
});

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

const SettingsStack = createStackNavigator({
  Settings: { screen: TwSettingsView },
  Favorite: { screen: TwFavoriteView },
  About: { screen: TwAboutView },
});

/**
 * @function
 * renders SettingsIcon
*/
function SettingsIcon({ tintColor }) {
  return <Ionicons name="md-cog" size={25} style={{ color: tintColor }} />;
}

SettingsIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: SettingsIcon,
};


const RootNavigation = createBottomTabNavigator(
  {
    ListView: {
      screen: ListStack,
    },
    MapScreen: {
      screen: MapStack,
    },
    SettingsStack: {
      screen: SettingsStack,
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
