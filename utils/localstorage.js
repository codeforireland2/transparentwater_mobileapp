import { AsyncStorage } from 'react-native';

const SETTINGS_STORAGE_KEY = '@TransparentWater:Settings';

/**
 * @function getSettings
 * retrieves settings object from local storage
 */
export function getSettings () {
  return AsyncStorage.getItem(SETTINGS_STORAGE_KEY)
    .then((results) => {
      if (results) {
        return JSON.parse(results);
      }
      return {
        favoriteCounties: [],
      };
    });
}

/**
 * @function setSettings
 * sets setting object on change
 */
export function setSettings(settings) {
  return AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    .catch(() => {
      // TODO: Error Handling
    });
}
