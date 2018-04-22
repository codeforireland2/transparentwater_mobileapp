import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const listView = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />;
const mapView = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'List' },
      { key: 'second', title: 'Map' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderFooter = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: listView,
    second: mapView,
  });

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
