import Vue from 'vue'
import 'babel-polyfill'
import BootstrapVue from 'bootstrap-vue'; Vue.use(BootstrapVue); import 'bootstrap/dist/css/bootstrap.css'; import 'bootstrap-vue/dist/bootstrap-vue.css';

 import './jquery.min.js'
 import './api-yandex-maps.js'
 import './script_ya.js'
import VueMask from 'v-mask'; Vue.use(VueMask);

import vSelect from 'vue-select'; Vue.component('v-select', vSelect)


import App from './Test.vue'


window.tarifs = [
  {
    id: 0,
    title: 'ЭКОНОМ (до 3 пасажиров)',
    icon: './src/1.png',
    desc: 'Hondai Solaris и подобные',
    desc_cost: '1 414 р.',
    mesta: {sitdown: 3,standup: 0},
    min_cost: 600,
    deliv_tarif: 30
  },{
    id: 1,
    title: 'СТАНДАРТ (до 3 пасажиров)',
    icon: './src/2.png',
    desc: 'Scoda Octavia и подобные',
    desc_cost: '1 995 р.',
    mesta: {sitdown: 3,standup: 0},
    min_cost: 600,
    deliv_tarif: 30
    },{
      id: 2,
      title: 'КОМФОРТ (до 3 пасажиров)',
      icon: './src/3.png',
      desc: 'Toyota Camry и подобные',
      desc_cost: '2 626 р.',
      mesta: {sitdown: 3,standup: 0},
      min_cost: 600,
      deliv_tarif: 30
    },{
      id: 3,
      title: 'БИЗНЕС (до 3 пасажиров)',
      icon: './src/4.png',
      desc: 'Mercedes-Benz E-class w212 и подобные',
      desc_cost: '2 929 р.',
      mesta: {        sitdown: 3,        standup: 0      },
      min_cost: 700,
      deliv_tarif: 25
    },{
      id: 4,
      title: 'МИНИВЭН (до 6 пасажиров)',
      icon: './src/5.png',
      desc: 'Wolkswagen Caravelle и подобные',
      desc_cost: '3 535 р.',
      mesta: {sitdown: 6,standup: 2},
      min_cost: 500,
      deliv_tarif: 31, //стоимость 1 км
      deliv_tarif_min: 1 //стоимость 1 мин
    },{
      id: 5,
      title: 'МИНИВЭН+ (до 8 пасажиров)',
      icon: './src/6.png',
      desc: 'Mercedes-Benz Vito и подобные',
      desc_cost: '4 495 р.',
      mesta: {sitdown: 10,standup: 4},
      min_cost: 600,
      deliv_tarif: 30
    }
  ]

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
