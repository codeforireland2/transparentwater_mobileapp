import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList, StatusBar, View } from 'react-native';
import { Header, ListItem, Body, Item, Input, Right, Icon, Text } from 'native-base';

import { getNoticeType, groupBy, formatDate } from '../utils/helpers';

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    height: StatusBar.currentHeight + 60,
  },
});

/**
 * @function
 * Renders each List Item
 */
const TwListItem = (item) => {
  const type = getNoticeType(item.NOTICETYPE[0]);
  return (
    <ListItem>
      <Body>
        <Text>{item.TITLE.split(' - ')[0]}</Text>
        <Text style={type.getStyle()}>{type.getIcon()} {type.name} </Text>
        <Text note numberOfLines={1}>{item.DESCRIPTION.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
      </Body>
      <Right>
        <Text note>{formatDate(new Date(item.STARTDATE))}</Text>
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
class TwListView extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    filterString: '',
  }

  /**
   * @function _filter
   * filters items
   */
  _filter = (data) => {
    const { filterString } = this.state;
    if (!filterString) {
      return data;
    }
    const filterRegex = new RegExp(filterString.toLowerCase());
    return data.filter(item => item.COUNTY.toLowerCase().match(filterRegex));
  }

  /**
   * @function _prepareData
   * apply filter and group
   */
  _prepareData = (data) => {
    const filteredData = this._filter(data);
    const groupedData = groupBy(filteredData, 'COUNTY');
    return Object.keys(groupedData).map(key => ({
      title: key,
      data: groupedData[key],
    }));
  }

  /**
   * @function _keyExtractor
   * used to extract key for List
   */
  _keyExtractor = item => item.OBJECTID.toString();


  /**
  * @function render
  */
  render() {
    const { data } = this.props.screenProps;
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
          renderItem={({ item }) => TwListItem(item)}
          renderSectionHeader={({ section: { title } }) => (
            <ListItem itemDivider><Text>{ title }</Text></ListItem>
          )}
          sections={this._prepareData(data)}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

TwListView.propTypes = {
  screenProps: PropTypes.shape({
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
      NOTICETYPE: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
  }).isRequired,
};

export { TwListView };
