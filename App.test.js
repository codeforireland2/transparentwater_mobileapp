import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

// see this issue for an explanation of why the snippet is required
// https://github.com/react-community/react-native-maps/issues/889
jest.mock('react-native-maps', () => { // eslint-disable-line no-undef
  /* eslint-disable react/no-multi-comp */
  const React = require.requireActual('react'); // eslint-disable-line no-shadow
  const MapView = require.requireActual('react-native-maps');

  const MockCallout = () => React.createElement('Callout', this.props, this.props.children);

  /* eslint-disable react/prefer-stateless-function */
  /**
  * @class MockMapView
  */
  class MockMarker extends React.Component {
    /**
    * @function render
    */
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }
  /* eslint-enable react/prefer-stateless-function */

  /* eslint-disable react/prefer-stateless-function */
  /**
  * @class MockMapView
  */
  class MockMapView extends React.Component {
    /**
    * @function render
    */
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }
  /* eslint-enable react/prefer-stateless-function */

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
  /* eslint-disable react/no-multi-comp */
});

it('renders without crashing', () => { // eslint-disable-line no-undef
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy(); // eslint-disable-line no-undef
});
