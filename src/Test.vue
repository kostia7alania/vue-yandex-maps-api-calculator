<template>
  <div style="text-align:center">
    <b-container>
      <h3>Выберите транспорт:</h3>
      <v-select :on-change="selectCarHandler"  :searchable="false" :options="tarifs" label="title">
        <span slot="no-options">Нет результатов... </span>
        <template slot="option" slot-scope="option">
              <b-row  class="justify-content-md-center">
                  <b-col><b-badge pill variant="success">{{ option.title }}</b-badge>
                    <span style="font-weight:555" class="fa fa-male fa-1x" v-if="option.mesta>0">  {{option.mesta}} </span> </b-col>
                  <b-col >{{ option.desc }} и подобные</b-col>
                  <b-col  cols="12" md="auto">от {{ option.min_cost }}
                    <i class="fa fa-ruble-sign" aria-hidden="true"></i>
                  </b-col>
                <b-col cols="12" md="auto"><b-img slot="aside" :src="option.icon" width="100" alt="Фото транспорта" /></b-col>
              </b-row>
          </template>
      </v-select>
      <div v-if="tarifs[selected].mesta>0">
        <h3>Количество пассажиров:</h3>
        <div class="row  justify-content-md-center">
          <div class="col col-lg-6 center">
            <vue-slider v-model="passagers" :min=0 :max="max_sit" v-bind="opts"></vue-slider>
          </div>
        </div>
      </div>


    <h3>Выберите адреса на карте</h3>
    <div id="map"></div>


  <div v-if="distance_val"  class="row">
<br>
  <div class="col"> <b-alert show variant="danger"><b>Дистанция: </b> {{distance_text}}  </b-alert></div>
  <div class="col">  <b-alert show variant="danger"> <b><i class="fa fa-clock" aria-hidden="true"></i></b> {{dispClock}} </b-alert></div>
  <div class="col">  <b-alert show variant="danger"><i class="fas fa-tachometer-alt"></i> {{dispSpeed}} км/ч </b-alert></div>


    <div class="col-12">
    <p>
      <b>Откуда:</b> {{firstGeoObject}}<br>
      <b>Куда:</b> {{secontGeoObject}}<br>
      Посмотреть на сайте <a target="_blank" :href="'https://yandex.ru/maps?mode=routes&rtext='+x1+'%2C'+y1+'~'+x2+'%2C'+y2">Яндекс карты</a>
    </p>

    <h1> Примерная стоимость:
    {{tudaobratno>0?(price/1.50) + " + " + (price-price/1.50) + " = " +price : price }}
    <i class="fa fa-ruble-sign"></i>
    </h1>

  <b-form-checkbox id="checkboxes1" name="tudaobratn" @change="tudaobratnoHandler"> Туда и обратно  <b-badge pill variant="success">скидка -50%</b-badge> <b-badge pill variant="primary">ожидание - до 4х часов</b-badge></b-form-checkbox>

  </div>
  </div>
  <hr>
  <div>
  <div>
    <b-input-group prepend="Введите телефон">
      <input class="form-control" type="tel" v-mask="'+7(###)-###-####'" placeholder="+7(___)-___-____" v-model="tel"></input>
    </b-input-group>

<br>
    <div>
      <b-btn v-b-toggle.collapse2 variant="default">Выбрать дату</b-btn>
      <b-collapse id="collapse2" class="mt-2">
          <b-container>
            <b-row class="my-1">
              <b-col sm="6"><b-form-input type="date"  v-model="go_to_date"></b-form-input></b-col>
              <b-col sm="6"><b-form-input type="time"  v-model="go_to_time"></b-form-input></b-col>
            </b-row>
          </b-container>
      </b-collapse>
    </div>

    <br>

    <div>
      <b-btn v-b-toggle.collapse1 variant="default">Добавить комментарий</b-btn>
      <b-collapse id="collapse1" class="mt-2">
        <b-form-textarea v-model="comment"
                        placeholder="Ваш комментарий или вопрос можете оставить здесь..."
                        :rows="3"
                        :max-rows="5">
        </b-form-textarea>
      </b-collapse>
    </div>

<br>
    <b-container>
      <b-row class="my-1">
         <b-col sm="12">
            <b-button  size="lg" @click="zakazat" variant="danger">Заказать этот маршрут</b-button>
        </b-col>
     </b-row>
    </b-container>
   </div>



  </div>


   </b-container>
</div>
</template>

<script>
import vueSlider from 'vue-slider-component';
export default {
  components: {vueSlider},
  props: ['tarifs'],
  data () {
    return {value:1,
        opts:{
          piecewiseLabel: true,piecewise: true,
          piecewiseStyle: {  "backgroundColor": "#ccc",  "visibility": "visible",  "width": "12px",  "height": "12px"},
          piecewiseActiveStyle: {  "backgroundColor": "#3498db"},labelActiveStyle: {  "color": "#3498db"}
        },
        mask: '##:##',
        placeholder: '23:45',
        tudaobratno:0,
        tel: '',
        selected: 0,
        passagers: 1,
        max_sit: 4,
        price: 0,
        distance_val: '',
        durationInTraffic_val: '',
        duration_val:'',
        distance_text: '',
        durationInTraffic_text: '',
        duration_text:'',
        x1:'',y1:'',x2:'',y2:'',
        firstGeoObject:'',
        secontGeoObject:'',
        tel_val:"+7 (___) ___ ____",
        go_to_date:'',
        go_to_time:'',
        comment: ''
    }
  },
  mounted(){ window.v = this;
   console.log ('yaaa=====',ya_init())},
   computed:{
     dispSpeed(){
      let distance_val = this.distance_val/1000;   //км
       let duration_val = this.duration_val/60/60;  //часы
       let durationInTraffic_val = this.durationInTraffic_val/60/60; //часы
       let km_ch = Math.round(distance_val/duration_val)
       let km_ch_trafic =Math.round(distance_val/durationInTraffic_val)

        if(km_ch==km_ch_trafic) return km_ch;
        if(km_ch<km_ch_trafic)  return km_ch + ' - ' + km_ch_trafic;
        if(km_ch>km_ch_trafic)  return km_ch_trafic + ' - ' + km_ch;

     },
     dispClock(){
       let duration_text = this.duration_text;
       let durationInTraffic_text = this.durationInTraffic_text;
        if(parseInt(durationInTraffic_text)==parseInt(duration_text)){
              var output = duration_text;
        }else if(parseInt(durationInTraffic_text)>parseInt(duration_text)){
              var output = duration_text + ' - ' + durationInTraffic_text;
        }else{var output = durationInTraffic_text + ' - ' + duration_text; }
        return output;
     }
   },
  methods: {
    zakazat(){
      alert('\n ! ! !! ! ВОТ ТЕБЕ ВСЯ СОБРАННАЯ ИНФА по заказу =>>>\n\n (это все надо терь апрокинуть тебе в ворпресс)\n\n'+JSON.stringify(this.$data))
    },
    tudaobratnoHandler(e){
      this.tudaobratno = e==true?1:0;
       this.calculate_cost();
    },
    passagersHandler(e) {
      this.passagers = e.target.value;
    },
    selectCarHandler(e){
      console.log('e.idd=>', e.id)
      this.selected = e.id
        console.log('this.selected=>',this.selected)
        this.calculate_cost();
        console.log(1111111111111)
        this.max_sit    = this.tarifs[this.selected].mesta
        this.passagers =       this.passagers      >this.tarifs[this.selected].mesta?this.tarifs[this.selected].mesta:this.passagers;
     },
    calculate_cost(){
          var min_cost    =  this.tarifs[this.selected].min_cost
          var deliv_tarif_km =  this.tarifs[this.selected].deliv_tarif_km
          var deliv_tarif_mins =  this.tarifs[this.selected].deliv_tarif_mins
          var cost_km = Math.round(Math.max( (this.distance_val / 1000) * deliv_tarif_km, min_cost));
          var cost_mins = Math.round(Math.max( (this.duration_val / 60) * deliv_tarif_mins, min_cost));
          this.price = Math.max(cost_km,cost_mins,min_cost);
          this.price = this.tudaobratno==1?(this.price/2+this.price):this.price;

    }
  }
}
</script>

<style>
.clear{display:none}
select:hover{cursor:pointer} select {border: 1px dashed black;}
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

  .bold{font-weight: 650}
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}

h1,.muted {  color: #2c3e5099;  }

h1 {
  font-size: 26px;
  font-weight: 600;
}

#app {
  max-width: 30em;
  margin: 1em auto;
}

 #map {    width: 100%;
            height:  222px;
            padding: 0;
            margin: 0;
  }


</style>
