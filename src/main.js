import Vue from 'vue'
import 'babel-polyfill'
import BootstrapVue from 'bootstrap-vue'; Vue.use(BootstrapVue); import 'bootstrap/dist/css/bootstrap.css'; import 'bootstrap-vue/dist/bootstrap-vue.css';

 import './jquery.min.js'
 //import './api-yandex-maps.js' //lagS!!
 import './script_ya.js'
import VueMask from 'v-mask'; Vue.use(VueMask);

import vSelect from 'vue-select'; Vue.component('v-select', vSelect)


import App from './App.vue'


window.tarifs = [
  {
    id: 0,
    title: "Бизнес",
    icon: "./src/img/4.png",
    desc: "Mercedes E-class",
    mesta: 4,
    min_cost: 2000, //минималка в рублях
    deliv_tarif_km: 40, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 1,
    title: "Премиум",
    icon: "./src/img/premium.png",
    desc: "Mercedes S-class",
    mesta: 3,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 75, //стоимость 1 км
    deliv_tarif_mins: 3 //стоимость 1 мин
  },
  {
    id: 2,
    title: "Минивэн",
    icon: "./src/img/minivan.png",
    desc: "Ford Galaxy",
    mesta: 8,
    min_cost: 3000, //минималка в рублях
    deliv_tarif_km: 38, //стоимость 1 км
    deliv_tarif_mins: 1 //стоимость 1 мин
  },
  {
    id: 3,
    title: "Минивэн+",
    icon: "./src/img/miniven+viano.png",
    desc: "Mercedes-Benz Viano",
    mesta: 7,
    min_cost: 4000, //минималка в рублях
    deliv_tarif_km: 52, //стоимость 1 км
    deliv_tarif_mins: 3 //стоимость 1 мин
  },
  {
    id: 4,
    title: "Минивэн Vip",
    icon: "./src/img/minivan-vip.png",
    desc: "Mercedes-Benz V-class",
    mesta: 6,
    min_cost: 6000, //минималка в рублях
    deliv_tarif_km: 77, //стоимость 1 км
    deliv_tarif_mins: 4 //стоимость 1 мин
  },
  {
    id: 5,
    title: "Микроавтобус",
    icon: "./src/img/microavtobus-16.png",
    desc: "Ford Transit",
    mesta: 16,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 58, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 6,
    title: "Микроавтобус",
    icon: "./src/img/microavtobus-20.png",
    desc: "Mercedes-Benz Sprinter",
    mesta: 21,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 63, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 7,
    title: "Микроавтобус Vip",
    icon: "./src/img/vip+sprinter.png",
    desc: "Mercedes-Benz Sprinter Vip",
    mesta: 21,
    min_cost: 5000, //минималка в рублях
    deliv_tarif_km: 74, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 8,
    title: "Маршрутка",
    icon: "./src/img/marshrutka.png",
    desc: "Hyndai County",
    mesta: 19,
    min_cost: 4000, //минималка в рублях
    deliv_tarif_km: 58, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 9,
    title: "Автобус",
    icon: "./src/img/avtobus-44.png",
    desc: "Hyndai",
    mesta: 44,
    min_cost: 7000, //минималка в рублях
    deliv_tarif_km: 93, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 10,
    title: "Автобус",
    icon: "./src/img/avtobus_new.png",
    desc: "Mercedes",
    mesta: 50,
    min_cost: 8000, //минималка в рублях
    deliv_tarif_km: 132, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },
  {
    id: 11,
    title: "Услуга трезвый водитель (Перегон)",
    icon: "./src/img/9.png",
    desc: "Доставим Вас и Ваш автомобиль в любое место",
    mesta: "",
    min_cost: 800, //минималка в рублях
    deliv_tarif_km: 55, //стоимость 1 км
    deliv_tarif_mins: 2 //стоимость 1 мин
  },{
    id: 12,
    title: 'Перевозка авто до 1,5 тонн на эвакуаторе',
    icon: './src/img/evakuator.jpg',
    desc: 'Наш водитель на эвакуаторе погрузит и перевезёт ваш автомобиль',
    desc_cost: '6 000 р.',
    mesta: 3,
    min_cost: 6000,
    deliv_tarif_km: 59, //стоимость 1 км
    deliv_tarif_mins: 1 //стоимость 1 мин
    },{
    id: 13,
    title: 'Перевозка авто до 3 тонн на эвакуаторе',
    icon: './src/img/evakuator3.jpg',
    desc: 'Наш водитель на эвакуаторе погрузит и перевезёт ваш автомобиль',
    desc_cost: '6 000 р.',
    mesta: 3,
    min_cost: 7000,
    deliv_tarif_km: 68, //стоимость 1 км
    deliv_tarif_mins: 1 //стоимость 1 мин
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
