import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
  },
});

export const alertTypes = {
  WATEROUTAGE: {
    name: 'Water Outage',
    color: 'orange',
    iconName: 'water-off',
    iconType: 'MaterialCommunityIcons',
  },
  TRAFFICDISRUPTIONS: {
    name: 'Traffic Distruptions',
    color: '#BF5700',
    iconName: 'traffic-cone',
    iconType: 'Entypo',
  },
  DONOTDRINK: {
    name: 'Do Not Drink',
    color: 'red',
    iconName: 'circle-slash',
    iconType: 'Octicons',
  },
  BOILWATERNOTICE: {
    name: 'Boil Water Notice',
    color: 'red',
    iconName: 'kettle',
    iconType: 'MaterialCommunityIcons',
  },
};

/**
 * @function groupBy
 * groups Array by Key into object
 */
export function groupBy(xs, key) {
  return xs.reduce((rvIn, x) => {
    const rv = rvIn;
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

/**
 * @function getNoticeType
 * return object with notice name, style and icon
 */
export function getNoticeType(type) {
  if (alertTypes[type]) {
    return {
      name: alertTypes[type].name,
      getIcon: () => (
        <Icon
          name={alertTypes[type].iconName}
          type={alertTypes[type].iconType}
          style={[styles.icon, { color: alertTypes[type].color }]}
        />
      ),
      getStyle: () => ({
        color: alertTypes[type].color,
      }),
    };
  }
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

/**
 * @function formatDate
 * formatsDate in irish format
 * formats as DD/MM/YY e.g.
 * 01/21/2008
 */
export function formatDate(date) {
  let day = `${date.getDate()}`;
  let month = `${date.getMonth() + 1}`;
  const year = (`${date.getFullYear()}`).substr(2, 2);
  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;
  return [day, month, year].join('/');
}
