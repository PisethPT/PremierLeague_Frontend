import { createI18n } from 'vue-i18n';
import EN from './EN.json';
import KH from './kh.json';

const i18n = createI18n({
    locale: 'EN',
    fallbackLocale: 'EN',
    messages: {
        EN,
        KH,
    },
});

export default i18n;