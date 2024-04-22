import HomeV from '../page/Home.vue'
import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
})

createApp(HomeV, {
  title: 'My app in working',
})
  .use(vuetify)
  .mount('#app')