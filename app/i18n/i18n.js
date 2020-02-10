import I18n from 'react-native-i18n';
import en from './locales/en';
import ru from './locales/ru';

I18n.fallbacks = true;
I18n.defaultLocale = 'ru';
I18n.locale = 'ru';
I18n.translations = {
    en,
    ru,
};

export default I18n;
