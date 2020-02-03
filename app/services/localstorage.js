import AsyncStorage from '@react-native-community/async-storage';

export const storeGeneralData = async (data) => {
    try {
        await AsyncStorage.setItem('@GeneralData', JSON.stringify(data));
    } catch (e) {
        // saving error
    }
};
export const getGeneralData = async () => {
    try {
        const value = await AsyncStorage.getItem('@GeneralData');
        if (value !== null) {
            // value previously stored
            return value;
        }
        return null;
    } catch (e) {
        // error reading value
    }
    return null;
};

export const storeElectData = async (data) => {
    try {
        await AsyncStorage.setItem('@ElectData', JSON.stringify(data));
    } catch (e) {
        // saving error
    }
};
export const getElectData = async () => {
    try {
        const value = await AsyncStorage.getItem('@ElectData');
        if (value !== null) {
            // value previously stored
            return value;
        }
        return null;
    } catch (e) {
        // error reading value
    }
    return null;
};
