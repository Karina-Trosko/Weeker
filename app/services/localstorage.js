import AsyncStorage from '@react-native-community/async-storage';

export const GENERAL_DATA = '@GeneralData';
export const FAVOURITE_DATA = '@FavouriteData';
export const EXPIRATION_DATE = '@ExpirationDate';
export const LANG = '@Lang';

export const storeData = async (data, key) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
};
export const getStoredData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
    return null;
};
