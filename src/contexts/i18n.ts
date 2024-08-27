import i18n from "i18next";

import en from '../translate/en.json';
import fr from '../translate/fr.json';

i18n.init({
    interpolation: { escapeValue: false },
    lng: navigator.language,
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
});

export default i18n;