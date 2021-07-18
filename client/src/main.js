import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts"
import VueCarousel from "@chenfengyuan/vue-carousel";

createApp(App).use(VueApexCharts).component(VueCarousel.name, VueCarousel).mount('#app')
