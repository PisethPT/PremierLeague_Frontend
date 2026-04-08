import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import vue3GoogleLogin from "vue3-google-login";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(vue3GoogleLogin, {
  clientId:
    "221318270614-omrpa765gv7tbaiiuu40r2i95qiqrktm.apps.googleusercontent.com",
});

app.mount("#app");
