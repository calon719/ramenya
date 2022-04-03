import { createApp } from 'vue';

// plugin start
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import {
  required, email, min, max, min_value, max_value, numeric,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// plugin end

import './assets/stylesheet/all.scss';
import loadingComponent from '@/components/LoadingComponent.vue';
import App from './App.vue';
import router from './router';

// plugin init start
AOS.init();

// vee-validate configs start
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('min_value', min_value);
defineRule('max_value', max_value);
defineRule('numeric', numeric);

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');
// vee-validate configs end
// plugin init end

const app = createApp(App);

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('loadingComponent', loadingComponent);

app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
