import React from 'react';
import { View, SectionList, StatusBar, StyleSheet } from 'react-native';
import { Header, ListItem, Body, Item, Input, Right, Icon, Text } from 'native-base';

import { getNoticeType, groupBy } from '../utils/helpers';

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    height: StatusBar.currentHeight + 60,
  },
});

const TwListItem = (item, onPress) => {
  const type = getNoticeType(item.NOTICETYPE[0]);
  return (
    <ListItem onPress={() => onPress(item)}>
      <Body>
        <Text>{item.TITLE.split(' - ')[0]}</Text>
        <Text style={type.getStyle()}>{type.getIcon()} {type.name}</Text>
        <Text note numberOfLines={1}>{item.DESCRIPTION.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
      </Body>
      <Right>
        <Text note>{new Date(item.STARTDATE).toLocaleDateString()}</Text>
      </Right>
    </ListItem>
  );
};

/**
* @class TwListView
* display of the data in a list
* the title is in bold
* the View has a bar
*/
export class TwListView extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  state = {
    filterString: '',
  }

  _filter = (data) => {
    const { filterString } = this.state;
    if (!filterString) {
      return data;
    }
    const filterRegex = new RegExp(filterString.toLowerCase());
    return data.filter((item) => {
      return item.COUNTY.toLowerCase().match(filterRegex) ||
        item.COUNTY.toLowerCase().match(filterRegex);
    });
  }

  _prepareData = (data) => {
    const filteredData = this._filter(data);
    const groupedData = groupBy(filteredData, 'COUNTY');
    return Object.keys(groupedData).map((key) => {
      return {
        title: key,
        data: groupedData[key],
      };
    });
  }

  _keyExtractor = item => item.OBJECTID.toString();

  /**
  * @function render
  */
  render() {
    const { data, refreshData, refreshing } = this.props.screenProps;
    const onPress = (alertItem) => {
      this.props.navigation.navigate('Details', { item: alertItem });
    };
    if (!data) return (<View><Text>Loading Data...</Text></View>);
    return (
      <View style={{ flex: 1 }}>
        <Header searchBar rounded style={styles.header}>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search By County"
              onChangeText={value => this.setState({ filterString: value })}
            />
          </Item>
        </Header>
        <SectionList
          renderItem={({ item }) => TwListItem(item, onPress)}
          renderSectionHeader={({ section: { title } }) => (
            <ListItem itemDivider><Text>{ title }</Text></ListItem>
          )}
          sections={this._prepareData(data)}
          refreshing={refreshing}
          onRefresh={() => refreshData()}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

