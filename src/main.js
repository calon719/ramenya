import { createApp } from 'vue';

// plugin start
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import {
  required, email, min, min_value, numeric // eslint-disable-line
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// plugin end

import loadingText from '@/components/LoadingText.vue';
import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('min_value', min_value);
defineRule('numeric', numeric);

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('loadingText', loadingText);

app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
