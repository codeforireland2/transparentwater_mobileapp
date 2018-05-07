import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { TwMapView } from './TwMapView.js';
import { TwListView } from './TwListView.js';
import sample from './data/sample-out.json'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'list', title: 'List' },
      { key: 'map', title: 'Map' },

    ],
    data: sample
  };

  _handleIndexChange = index => this.setState({ index });

  _renderFooter = props => <TabBar {...props} />;

  _renderScene = ({route}) => {
      switch(route.key){
        case 'map':
          return <TwMapView data={this.state.data}/>;
        default:
          return <TwListView data={sample}/>;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
