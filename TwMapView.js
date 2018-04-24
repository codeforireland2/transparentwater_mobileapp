import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView from 'react-native-maps';


export class TwMapView extends React.Component {
	
	state = {
		region: {
			latitude:  53.350140,
			longitude: -6.266155,
			latitudeDelta: 0.2,
			longitudeDelta: 0.2
		}
    }
	
	onRegionChange (region) {
		this.setState({ region });
	}


	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={this.state.region}
					onRegionChange={this.onRegionChange}
					showsUserLocation={true}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
  map: {
    flex: 1
  },
});