import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export class TwMapView extends React.Component {
  state = {
    region: {
      latitude: 53.350140,
      longitude: -6.266155,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={() => this.onRegionChange.bind(this)}
          showsUserLocation={true} // eslint-disable-line react/jsx-boolean-value
        />
      </View>
    );
  }
}
