<template>
  <div style="text-align:center">
    <b-container>
  
      <b-form-group label="Вариант аренды:">
        <b-form-radio-group v-model="var_arendy_selected" :options="var_arendy" name="radioInline"> </b-form-radio-group>
      </b-form-group>

    <Autos :tarifs="tarifs" @select-car-handler="selectCarHandler"></Autos>
   
    <div v-show="var_arendy_selected == 'standart' ">

      <div v-if=" (tarifs[selected].mesta>0) && (var_arendy_selected == 'standart') ">
        <h3>Количество пассажиров:</h3>
        <div class="row  justify-content-md-center">
          <div class="col col-lg-6 center">
            <vue-slider v-model="passagers" :min=0 :max="tarifs[selected].mesta" v-bind="opts"></vue-slider>
          </div>
        </div>
      </div>


    <h3>Выберите адреса на карте</h3>
     Введите адреса в поля или на карте переместите метку Откуда и поставьте метку Куда
    <div id="map"></div>

<br>
  <div v-show="distance_val"> 
    <div class="row col">
      <div class="col-md-4"> <b-alert show variant="danger"><i class="fa fa-road" aria-hidden="true"></i> {{distance_text}}  </b-alert></div>
      <div class="col-md-4">  <b-alert show variant="danger"> <b><i class="fa fa-clock" aria-hidden="true"></i></b> {{dispClock}} </b-alert></div>
      <div class="col-md-4">  <b-alert show variant="danger"><i class="fas fa-tachometer-alt"></i> {{dispSpeed}} км/ч </b-alert></div>
  </div>
 
 <div class="row">
    <div class="col-xl-12">
      <br>
      <!--<b>Откуда:</b> {{firstGeoObject}}<br>
        <b>Куда:</b> {{secontGeoObject}}<br> -->
      <!-- Посмотреть на сайте <a target="_blank" :href="'https://yandex.ru/maps?mode=routes&rtext='+x1+'%2C'+y1+'~'+x2+'%2C'+y2">Яндекс карты</a> -->
 
     <b-form-checkbox v-show="tarifs[selected].id<11 " id="checkboxes1" name="tudaobratn" @change="tudaobratnoHandler"> Туда и обратно  <b-badge pill variant="success">При поездке >100 км - скидки до 50%</b-badge> <b-badge pill variant="primary"> и бесплатное ожидание - до 4х часов</b-badge></b-form-checkbox>

      <Price :tudaobratno='tudaobratno' :price="price"></Price>

      <div class="row  justify-content-md-center">
        <div class="col col-lg-6 col-xs-12">
          <b-form-checkbox v-model="custom_price_checked"> Предложить свою цену </b-form-checkbox>
          <div v-show="custom_price_checked"> 
              <input v-model="custom_price" class="form-control" type="tel" v-mask="'######'" placeholder="_____"></input> 
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
</div>
  <hr>
  <div>
  <div>

  <b-input-group prepend="Телефон">
    <input class="form-control" type="tel" v-mask="'+7(###)-###-####'" placeholder="+7(___)-___-____" v-model="tel"></input>
    <b-input-group-append> 
      <b-btn @click="call_me" variant="info">Заказать звонок</b-btn>
    </b-input-group-append>
  </b-input-group>
 
<br>
    <div v-show="var_arendy_selected=='standart'">
      <b-btn v-b-toggle.collapse2 variant="outline-info">Выбрать дату</b-btn>
      <b-collapse id="collapse2" class="mt-2">
          <b-container>
            <b-row class="my-1">
              <b-col sm="6"><b-form-input type="date"  v-model="go_to_date"></b-form-input></b-col>
              <b-col sm="6"><b-form-input type="time"  v-model="go_to_time"></b-form-input></b-col>
            </b-row>
          </b-container>
      </b-collapse>
    </div>
    <div v-show="var_arendy_selected!='standart'">
              <b-col sm="12">Сколько часов будет аренда:   <br>
                  <b-form-select @change="price_arenda_handler" v-model="arenda_time_sel" :options="arenda_time" class="mb-3" />
              </b-col>

      <b-btn v-b-toggle.collapse2 variant="outline-info">Выбрать даты</b-btn>
      <b-collapse id="collapse2" class="mt-2">
          <b-container>
            <b-row> 
              <b-col sm="6">Дата начала аренды:<b-form-input type="date"  v-model="go_to_date"></b-form-input></b-col>
              <b-col sm="6">Время начала аренды:<b-form-input type="time"  v-model="go_to_time"></b-form-input></b-col>
             </b-row>
          </b-container>
      </b-collapse> 
    </div>
    <br>

    <div>
      <b-btn v-b-toggle.collapse1 variant="outline-info">Добавить пожелания</b-btn>
      <b-collapse id="collapse1" class="mt-2">
        <b-form-textarea v-model="comment"
                        placeholder="Ваши пожелания, нюансы, будут-ли дети (нужны-ли детские кресла)..."
                        :rows="3"
                        :max-rows="5">
        </b-form-textarea>
      </b-collapse>
    </div>

    <br>
    <div class="text-center">
      <b-btn @click="zakazat" @hover="show_toltip=!show_toltip" id="tooltipButton-1" variant="outline-danger">Заказать 
        <span v-if="var_arendy_selected=='standart'">трансфер</span>
        <span v-else>автомобиль</span>
        </b-btn>
      <b-tooltip :show="show_toltip" target="tooltipButton-1" placement="bottom">Предоплата 20% </b-tooltip>
    </div>
  
  </div>



  </div>


   </b-container>
</div>
</template>

<script>
  import Autos from './Autos';
  import Price from './Price';
  import vueSlider from 'vue-slider-component';
  export default {
    components: {
      vueSlider, Autos, Price
    },
    props: ['tarifs'],
    data() {
      return {
        price_arenda: 0,
        arenda_time_sel: 0,
        arenda_time: [
          {text:"Выберите", value: 0},
          {text:'3 часа', value:3}, 
          {text:'4 часа', value:4}, 
          {text:'5 часа', value:5}, 
          {text:'6 часа', value:6}, 
          {text:'7 часа', value:7}, 
          {text:'8 часа', value:8}, 
          {text:'9 часа', value:9}, 
          {text:'10 часа', value:10}, 
          {text:'11 часа', value:11}, 
          {text:'12 часа', value:12}, 
          {text:'13 часа', value:13}, 
          {text:'14 часа', value:14}, 
          {text:'15 часа', value:15}, 
          {text:'16 часа', value:16}, 
          {text:'17 часа', value:17}, 
          {text:'18 часа', value:18}, 
          {text:'19 часа', value:19}, 
          {text:'20 часа', value:20}, 
          {text:'21 часа', value:21}, 
          {text:'22 часа', value:22}, 
          {text:'23 часа', value:23}, 
          {text:'24 часа', value:24}
        ],
        show_toltip: false,
        custom_price_checked: 0,
        custom_price: '',
        var_arendy_selected: 'standart',
        var_arendy: [{
            text: 'Трансфер',
            value: 'standart'
          },
          {
            text: 'Аренда с водителем',
            value: 'arenda'
          }
        ],
        value: 1,
        opts: {
          piecewiseLabel: true,
          piecewise: true,
          piecewiseStyle: {
            "backgroundColor": "#ccc",
            "visibility": "visible",
            "width": "12px",
            "height": "12px"
          },
          piecewiseActiveStyle: {
            "backgroundColor": "#3498db"
          },
          labelActiveStyle: {
            "color": "#3498db"
          }
        },
        mask: '##:##',
        placeholder: '23:45',
        tudaobratno: 0,
        tel: '',
        selected: 0, 
        passagers: 1,
        price: 0,
        distance_val: '',
        durationInTraffic_val: '',
        duration_val: '',
        distance_text: '',
        durationInTraffic_text: '',
        duration_text: '',
        x1: '',
        y1: '',
        x2: '',
        y2: '',
        firstGeoObject: '',
        secontGeoObject: '',
        tel_val: "+7 (___) ___ ____",
        go_to_date: '',
        go_to_time: '',
        comment: '',
        go_to_date_arenda_end: '',
        go_to_time_arenda_end: ''
      }
    },
    mounted() {
      window.v = this;
      console.log('ya_init()=====>', ya_init())
    },
    computed: {
      dispSpeed() {
        let distance_val = this.distance_val / 1000; //км
        let duration_val = this.duration_val / 60 / 60; //часы
        let durationInTraffic_val = this.durationInTraffic_val / 60 / 60; //часы
        let km_ch = Math.round(distance_val / duration_val)
        let km_ch_trafic = Math.round(distance_val / durationInTraffic_val)
  
        if (km_ch == km_ch_trafic) return km_ch;
        if (km_ch < km_ch_trafic) return km_ch + ' - ' + km_ch_trafic;
        if (km_ch > km_ch_trafic) return km_ch_trafic + ' - ' + km_ch;
  
      },
      dispClock() {
        let duration_text = this.duration_text;
        let durationInTraffic_text = this.durationInTraffic_text;
        if (parseInt(durationInTraffic_text) == parseInt(duration_text)) {
          var output = duration_text;
        } else if (parseInt(durationInTraffic_text) > parseInt(duration_text)) {
          var output = duration_text + ' - ' + durationInTraffic_text;
        } else {
          var output = durationInTraffic_text + ' - ' + duration_text;
        }
        return output;
      }
    },
    methods: {
  
      price_arenda_handler() {
        this.price_arenda = this.arenda_time_sel * this.tarifs[this.selected].arenda_tarif
      },
      call_me() {
        alert('\nПерезвон! \nВОТ ТЕБЕ ВСЯ СОБРАННАЯ ИНФА по заказу =>>>\n\n (это все надо терь апрокинуть тебе в ворпресс)\n\n' + JSON.stringify(this.$data))
      },
      zakazat() {
        alert('\n ! ! !! ! ВОТ ТЕБЕ ВСЯ СОБРАННАЯ ИНФА по заказу =>>>\n\n (это все надо терь апрокинуть тебе в ворпресс)\n\n' + JSON.stringify(this.$data))
      },
      tudaobratnoHandler(e) {
        this.tudaobratno = e == true ? 1 : 0;
        this.calculate_cost();
      },
      passagersHandler(e) {
        this.passagers = e.target.value;
      },
      selectCarHandler(e) {
        console.log('e.idd=>', e.id);
        this.selected = e.id;
        console.log('this.selected=>', this.selected);
        this.calculate_cost();
        console.log(1111111111111);
        this.passagers = this.passagers > this.tarifs[this.selected].mesta ? this.tarifs[this.selected].mesta : this.passagers;
      },
      calculate_cost() {
        var min_cost = this.tarifs[this.selected].min_cost
        var deliv_tarif_km = this.tarifs[this.selected].deliv_tarif_km
  
  
        if (this.tarifs[this.selected].id > 10) {
          this.tudaobratno = 0;
        } //тока в одну сторону) типа в обе стороны - дешевле вызывать обычное такси)% ну - пока так) а вообще. челу может надо нескоких доставить в пару точек)  но пока тока реализовано в одну)
  
        if (this.tarifs[this.selected].id == 11) { // под перегонщиkа ))
          if (((this.distance_val / 1000) <= 3) &&
            (this.tarifs[this.selected].id == 11)) { //3km (чисто под перегонщика! эвакуаторы в ЭЛС идут!)
            this.custom_price = this.price = min_cost;
          } else {
            var cost_km = Math.round(((this.distance_val / 1000) - 3) * deliv_tarif_km + min_cost); //-3km + min_cost
            this.custom_price = this.price = cost_km;
          }
  
        } else {
          //var deliv_tarif_mins = this.tarifs[this.selected].deliv_tarif_mins
          var cost_km = Math.round((this.distance_val / 1000) * deliv_tarif_km);
          //var cost_mins = Math.round((this.duration_val / 60) * deliv_tarif_mins);
          this.price = Math.max(cost_km, /*cost_mins,*/ min_cost);
          this.price = this.tudaobratno == 1 ? (this.price / 2 + this.price) : this.price;
          this.custom_price = this.price;
        }
      }
    }
  }
</script>

<style>
  .clear {
    display: none
  }
  
  select:hover {
    cursor: pointer
  }
  
  select {
    border: 1px dashed black;
  }
  
  input.ymaps-2-1-64-route-panel-input__input {
    color: black;
  }
  
  .center {
    text-align: center
  }
  
  input[type=range] {
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    height: 25px;
    /* Specified height */
    background: #d3d3d3;
    /* Grey background */
    outline: none;
    /* Remove outline */
    opacity: 0.7;
    /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s;
    /* 0.2 seconds transition on hover */
    transition: opacity .2s;
  }
  
  
  /* Mouse-over effects */
  
  input[type=range]:hover {
    opacity: 1;
    /* Fully shown on mouse-over */
  }
  
  
  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    width: 25px;
    /* Set a specific slider handle width */
    height: 25px;
    /* Slider handle height */
    background: #4CAF50;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
  }
  
  input[type=range]::-moz-range-thumb {
    width: 25px;
    /* Set a specific slider handle width */
    height: 25px;
    /* Slider handle height */
    background: #4CAF50;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
  }
  
  .bold {
    font-weight: 650
  }
  
  body {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    text-rendering: optimizelegibility;
    -moz-osx-font-smoothing: grayscale;
    -moz-text-size-adjust: none;
  }
  
  h1,
  .muted {
    color: #2c3e5099;
  }
  
  h1 {
    font-size: 26px;
    font-weight: 600;
  }
  
  #app {
    max-width: 30em;
    margin: 1em auto;
  }
  
  #map {
    width: 100%;
    height: 222px;
    padding: 0;
    margin: 0;
  }
  
  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    color: black;
  }
</style>
