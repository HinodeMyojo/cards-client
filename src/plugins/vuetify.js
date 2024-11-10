import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDialog, VBtn, VCard, VCardActions, VCardText } from 'vuetify/components';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
    components: {
        VDialog,
        VBtn,
        VCard,
        VCardActions,
        VCardText,
    },
    theme: {
        defaultTheme: 'dark',
    },
    icons: {
        defaultSet: 'mdi',
    },
});
