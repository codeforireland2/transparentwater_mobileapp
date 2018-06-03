import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import MapView from 'react-native-maps';

import { getNoticeType } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

/**
* @class TwMapView
* display of data on a map
*/
export class TwMapView extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  state = {
    region: {
      latitude: 53.350140,
      longitude: -6.266155,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
    markers: [],
  }

  /**
  * @function componentDidMount
  * function that is called after the component is initialised
  * this calculates the initial list of markers
  */
  componentDidMount() {
    this._findLocalMarkers();
  }

  /**
  * @function onRegionChange
  * this gets called when the user moves the map
  */
  onRegionChange(region) {
    this.setState({ region: region });
    this._findLocalMarkers();
  }

  /**
  * @function _findLocalMarkers
  * calculates the maximum/minimum points for the screen display
  * only adds notices to the list if they are within these boundaries
  * this increases loading speed
  * whenever the setState is called and the markers item is updated,
  * the markers shown on the map are updated automatically
  */
  _findLocalMarkers() {
    const regionInfo = this.state.region;
    const allNotices = this.props.screenProps.data;
    const localNotices = [];
    const latDelta = regionInfo.latitudeDelta;
    const lngDelta = regionInfo.longitudeDelta;
    const maxLatitude = regionInfo.latitude + latDelta;
    const minLatitude = regionInfo.latitude - latDelta;
    const maxLongitude = regionInfo.longitude + lngDelta;
    const minLongitude = regionInfo.longitude - lngDelta;

    allNotices.forEach((notice) => {
      const lat = notice.LAT;
      const lng = notice.LONG;

      if (lat > minLatitude &&
        lat < maxLatitude &&
        lng > minLongitude &&
        lng < maxLongitude) {
        localNotices.push(notice);
      }
    });

    // console.log('No of Markers: ', localNotices.length);
    this.setState({
      markers: localNotices,
    });
  }

  /**
  * @function render
  * renders the map and markers initially
  */
  render() {
    const onPress = (item) => {
      this.props.navigation.navigate('Details', { item });
    };
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={(region) => { this.onRegionChange(region); }}
          showsUserLocation={true} // eslint-disable-line react/jsx-boolean-value
        >
          {this.state.markers.map((notice) => {
            const type = getNoticeType(notice.NOTICETYPE[0]);
            return (
              <MapView.Marker
                key={notice.OBJECTID}
                coordinate={{
                  latitude: notice.LAT,
                  longitude: notice.LONG,
                }}
                title={notice.TITLE}
                description={notice.NOTICETYPE[0]}
              >
                <MapView.Callout onPress={() => onPress(notice)}>
                  <TouchableHighlight style={{ backgroundColor: 'white' }}>
                    <View>
                      <Text>{notice.TITLE.split(' - ')[0]}</Text>
                      <Text style={type.getStyle()}>{type.getIcon()} {type.name}</Text>
                      <Text note>{new Date(notice.STARTDATE).toLocaleDateString()}</Text>
                    </View>
                  </TouchableHighlight>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}
