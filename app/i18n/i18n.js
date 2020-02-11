import I18n from 'react-native-i18n';
import en from './locales/en';
import ru from './locales/ru';

I18n.fallbacks = true;
I18n.defaultLocale = 'ru';
I18n.translations = {
    en,
    ru,
};
export const changeLanguage = (lang) => {
    I18n.locale = lang;
};
export default I18n;
