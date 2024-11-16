/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'
import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faCar,
  faCog,
  faHome,
  faSignIn,
  faSignOut,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

const app = createApp(App)

library.add(faUser, faUsers, faHome, faCar, faBuilding, faCog, faSignOut, faSignIn);

registerPlugins(app)
app.mount('#app')
