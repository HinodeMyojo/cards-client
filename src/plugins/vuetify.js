import 'vuetify/styles'
import '@/styles/main.scss' 
import { createVuetify } from 'vuetify'

export default createVuetify(
    {
        theme: {
            themes: {
                dark: {
                    colors: {
                        primary: '#00b0ff',
                        secondary: '#424242',
                        accent: '#82B1FF',
                        error: '#FF5252',
                        info: '#2196F3',
                        success: '#4CAF50',
                        warning: '#FFC107'
                    }
                }
            }
        }
    }
) 