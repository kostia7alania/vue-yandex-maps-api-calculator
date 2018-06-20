import Vue from 'vue'
import 'babel-polyfill'
import BootstrapVue from 'bootstrap-vue'; Vue.use(BootstrapVue); import 'bootstrap/dist/css/bootstrap.css'; import 'bootstrap-vue/dist/bootstrap-vue.css';

 import './jquery.min.js'
 //import './api-yandex-maps.js' //lagS!!
 import './script_ya.js'
import VueMask from 'v-mask'; Vue.use(VueMask);

import vSelect from 'vue-select'; Vue.component('v-select', vSelect)


import App from './Test.vue'


window.tarifs = [
  {
    id: 0,
    title: "Бизнес",
    icon: "./src/4.png",
    desc: "Mercedes E-class",
    mesta: 3,
    min_cost: 1000, //минималка в рублях
    deliv_tarif_km: 38, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 1,
    title: "Премиум",
    icon: "./src/2.png",
    desc: "Mercedes S-class",
    mesta: 4,
    min_cost: 4000, //минималка в рублях
    deliv_tarif_km: 65, //стоимость 1 км
    deliv_tarif_mins: 3 //стоимость 1 мин
  },
  {
    id: 2,
    title: "Минивэн",
    icon: "./src/5.png",
    desc: "Ford Galaxy",
    mesta: 8,
    min_cost: 1000, //минималка в рублях
    deliv_tarif_km: 36, //стоимость 1 км
    deliv_tarif_mins: 1 //стоимость 1 мин
  },
  {
    id: 3,
    title: "Минивэн+",
    icon: "./src/6.png",
    desc: "Mercedes-Benz Viano",
    mesta: 7,
    min_cost: 2000, //минималка в рублях
    deliv_tarif_km: 45, //стоимость 1 км
    deliv_tarif_mins: 3 //стоимость 1 мин
  },
  {
    id: 4,
    title: "Минивэн Vip",
    icon: "./src/6.png",
    desc: "Mercedes-Benz V-class",
    mesta: 6,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 65, //стоимость 1 км
    deliv_tarif_mins: 4 //стоимость 1 мин
  },
  {
    id: 5,
    title: "Микроавтобус",
    icon: "./src/mikroavtobus_ford.png",
    desc: "Ford Transit",
    mesta: 15,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 53, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 6,
    title: "Микроавтобус",
    icon: "./src/mikroavtobus.png",
    desc: "Mercedes-Benz Sprinter",
    mesta: 20,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 62, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 7,
    title: "Микроавтобус Vip",
    icon: "./src/mikroavtobus.png",
    desc: "Mercedes-Benz Sprinter Vip",
    mesta: 20,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 72, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 8,
    title: "Маршрутка",
    icon: "./src/marshutka.png",
    desc: "Hyndai County",
    mesta: 20,
    min_cost: 3000, //минималка в рублях
    deliv_tarif_km: 53, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 9,
    title: "Автобус",
    icon: "./src/avtobus_old.png",
    desc: "Hyndai",
    mesta: 44,
    min_cost: 7000, //минималка в рублях
    deliv_tarif_km: 92, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 10,
    title: "Автобус VIP",
    icon: "./src/avtobus_new.png",
    desc: "Mercedes",
    mesta: 50,
    min_cost: 7000, //минималка в рублях
    deliv_tarif_km: 130, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 11,
    title: "Услуга трезвый водитель (Перегон)",
    icon: "./src/9.png",
    desc: "Наш водитель доставит вас и ваш автомобиль в любое место",
    mesta: "",
    min_cost: 700, //минималка в рублях
    deliv_tarif_km: 50, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  }
];

new Vue({
  el: '#app',
  data() {
    return {}
  },
  render: h => h(App, {
    props: {
      'tarifs': tarifs
    }
  })
})
