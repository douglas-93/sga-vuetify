/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'

// Types
import type { App } from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon);
}
