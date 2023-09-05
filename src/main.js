// Import our custom CSS
import '../src/assets/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';
axios.defaults.withCredentials = false; // Por defecto en Laravel 'supports_credentials' => false,

import 'izitoast/dist/css/iziToast.css';

const app = createApp(App)

app.use(router)

app.mount('#app')
