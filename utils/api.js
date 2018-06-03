import data from './sample.json';

/**
 * @function getInitialData
 * gets Initial data from API
 */
export function getInitialData() {
  /*
  The following code will be used to get our data from our api once active
  fetch(<URL HERE>).then((results) => {
    console.log(results);
  })
  */
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
}
