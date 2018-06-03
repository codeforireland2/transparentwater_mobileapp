import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
  },
});

export function groupBy(xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function getNoticeType(type) {
  switch (type) {
  case 'WATEROUTAGE':
    return {
      name: 'Water Outage',
      getIcon: () => (
        <Icon
          name="water-off"
          type="MaterialCommunityIcons"
          style={[styles.icon, { color: 'orange' }]}
        />
      ),
      getStyle: () => ({
        color: 'orange',
      }),
    };
  case 'TRAFFICDISRUPTIONS':
    return {
      name: 'Traffic Distruptions',
      getIcon: () => (
        <Icon name="traffic-cone" type="Entypo" style={[styles.icon, { color: 'orange' }]} />
      ),
      getStyle: () => ({
        color: 'orange',
      }),
    };
  case 'DONOTDRINK':
    return {
      name: 'Do Not Drink',
      getIcon: () => (
        <Icon name="circle-slash" type="Octicons" style={[styles.icon, { color: 'red' }]} />
      ),
      getStyle: () => ({
        color: 'red',
      }),
    };
  case 'BOILWATERNOTICE':
    return {
      name: 'Boil Water Notice',
      getIcon: () => (
        <Icon name="kettle" type="MaterialCommunityIcons" style={[styles.icon, { color: 'red' }]} />
      ),
      getStyle: () => ({
        color: 'red',
      }),
    };
  case undefined:
    return {
      name: type && type.length ? type : 'Unknown Notice Type',
      getIcon: () => (
        <Icon name="alert" style={[styles.icon, { color: 'black' }]} />
      ),
      getStyle: () => ({
        color: 'black',
      }),
    };
  default:
    // console.log(`Unknown Notice Type: ${type}`);
    return {
      name: type && type.length ? type : 'Unknown Notice Type',
      getIcon: () => (
        <Icon name="alert" style={[styles.icon, { color: 'black' }]} />
      ),
      getStyle: () => ({
        color: 'black',
      }),
    };
  }
}

