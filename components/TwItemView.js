import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'native-base';

import { getNoticeType } from '../utils/helpers';


export class TwItemView extends React.Component {
 static navigationOptions = ({ navigation }) => {
   const item = navigation.getParam('item', {});
   if (item) {
     return {
       title: item.TITLE.split(' - ')[0],
     };
   }
   return {};
 };

 render() {
   const { navigation } = this.props;
   const alertItem = navigation.getParam('item', {});
   const type = getNoticeType(alertItem.NOTICETYPE[0]);
   return (
     <ScrollView style={{ flex: 1, padding: 10 }}>
       <Text note>Location</Text>
       <Text>{alertItem.LOCATION}, {alertItem.COUNTY}</Text>
       <Text note>Type</Text>
       <Text style={type.getStyle()}>{type.getIcon()} {type.name}</Text>
       <Text note>Description</Text>
       <Text>{alertItem.DESCRIPTION.replace(/<\/?[^>]+(>|$)/g, '')} </Text>
       <Text note>Date</Text>
       <Text>{new Date(alertItem.STARTDATE).toLocaleDateString()}</Text>
       { alertItem.AFFECTEDPREMISES && (
         <View>
           <Text note>Affected Premises</Text>
           <Text> {alertItem.AFFECTEDPREMISES} </Text>
         </View>
       )}
     </ScrollView>
   );
 }
}
