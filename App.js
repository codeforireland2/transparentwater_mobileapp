import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { TwMapView } from './TwMapView';
import { TwListView } from './TwListView';
import sample from './data/sample-out.json';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
};

const styles = StyleSheet.create({ // eslint-disable-line no-unused-vars
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class App extends React.Component {
  state = {
    index: 0, // eslint-disable-line react/no-unused-state
    routes: [ // eslint-disable-line react/no-unused-state
      { key: 'list', title: 'List' },
      { key: 'map', title: 'Map' }
    ],
    data: sample // eslint-disable-line react/no-unused-state
  };

  /* eslint-disable react/no-unused-state */
  _handleIndexChange = index => this.setState({ index });
  /* eslint-enable react/no-unused-state */

  _renderFooter = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    switch (route.key) {
    case 'map':
      return <TwMapView />;
    default:
      return <TwListView data={sample} />;
    }
  }

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
