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
        >
          {this.props.data.map(notice => (
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
