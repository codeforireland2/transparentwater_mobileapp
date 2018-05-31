import React from 'react';
import PropTypes from 'prop-types';
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

/**
* @class TwMapView
* display of data on a map
*/
export class TwMapView extends React.Component {
  state = {
    region: {
      latitude: 53.350140,
      longitude: -6.266155,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2
    },
    markers: []
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
    const allNotices = this.props.data;
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
      markers: localNotices
    });
  }

  /**
  * @function render
  * renders the map and markers initially
  */
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={(region) => { this.onRegionChange(region); }}
          showsUserLocation={true} // eslint-disable-line react/jsx-boolean-value
        >
          {this.state.markers.map(notice => (
            <MapView.Marker
              key={notice.OBJECTID}
              coordinate={{
                latitude: notice.LAT,
                longitude: notice.LONG
              }}
              title={notice.TITLE}
              description={notice.NOTICETYPE[0]}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

TwMapView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    OBJECTID: PropTypes.number,
    WORKTYPE: PropTypes.string,
    TITLE: PropTypes.string,
    STARTDATE: PropTypes.number,
    ENDDATE: PropTypes.number,
    CONTACTDETAILS: PropTypes.string,
    AFFECTEDPREMISES: PropTypes.string,
    TRAFFICIMPLICATIONS: PropTypes.string,
    DESCRIPTION: PropTypes.string,
    STATUS: PropTypes.string,
    GLOBALID: PropTypes.string,
    APPROVALSTATUS: PropTypes.string,
    LOCATION: PropTypes.string,
    PRIORITY: PropTypes.string,
    COUNTY: PropTypes.string,
    REFERENCENUM: PropTypes.string,
    PROJECTNUMBER: PropTypes.string,
    PROJECT: PropTypes.string,
    LAT: PropTypes.number,
    LONG: PropTypes.number,
    NOTICETYPE: PropTypes.arrayOf(PropTypes.string)
  })).isRequired
};
