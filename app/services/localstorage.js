import AsyncStorage from '@react-native-community/async-storage';

export const GENERAL_DATA = '@GeneralData';
export const ELECT_DATA = '@ElectData';

export const storeData = async (data, key) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
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
        console.log(e);
    }
    return null;
};
