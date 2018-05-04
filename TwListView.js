import React from 'react';
import { StyleSheet, Dimensions, View ,Text} from 'react-native';




export class TwListView extends React.Component {


	constructor(props){
		
		super(props);
		
	}
	render() {
		

		return (
			  <View  />
			  <View style={styles.container}>
			  {this.props.data.map((item) => {
			  	console.log(item.TITLE)
			  	return(<Text key={item.OBJECTID}>{item.TITLE}</Text>)
 				
			  })}
			  </View  >
			  

		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: 'white'
  },
});