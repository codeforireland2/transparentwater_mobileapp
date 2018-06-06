import data from './sample.json';

/**
 * @function getInitialData
 * gets Initial data from API
 */
export function getInitialData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
}
