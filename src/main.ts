import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import VCalendar from "v-calendar";

import "@formkit/themes/genesis";
import "v-calendar/dist/style.css";

const app = createApp(App).use(createPinia());

app.use(router);
app.use(plugin, defaultConfig);
app.use(VCalendar, {});

app.mount("#app");
