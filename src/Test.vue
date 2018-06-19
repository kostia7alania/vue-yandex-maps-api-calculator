<template>
 <div style="text-align:center">


<div>
<b-container>

  <h3>Выберите транспорт:</h3>

  <v-select :on-change="selectCarHandler" :options="tarifs" label="title">
       <span slot="no-options">Нет результатов... </span>
    <template slot="option" slot-scope="option">
        <b-row  class="justify-content-md-center">
            <b-col><b-badge pill variant="success">{{ option.title }} </b-badge> </b-col>
            <b-col >{{ option.desc }}</b-col>
            <b-col  cols="12" md="auto">от {{ option.desc_cost }}</b-col>
           <b-col cols="12" md="auto"><b-img slot="aside" :src="option.icon" width="100" alt="Фото транспорта" /></b-col>
        </b-row>
    </template>
  </v-select>

</b-container>
    <div>
      <h3>Количество пассажиров:</h3>

      <div class="row  justify-content-md-center">
        <div class="col col-lg-6 center">
          <b>сидячих:</b>
          <div>
            <input type="range"
                v-model="passagers"
                :min="1" :max="max_sit" step="1">
            <span class="range-slider__value">{{passagers}}</span>
          </div>



        </div>
        <div class="col col-lg-6 center" v-if="standShow">
          <b class="bold">стоячих:</b>

          <div>
            <input type="range"
              v-model="passagers_stand"
              :min="0" :max="max_stand" step="1">


            <span>{{passagers_stand}}</span>
          </div>


    </div>


    </div>
  </div>

 </div>




  <h3>Выберите адреса на карте</h3>
  <div id="map"></div>



  <div v-if="distance_val"  class="row">
    <div class="col-12">
    </div>
    <div class="col-12">
    <p>
      <b>Откуда:</b> {{firstGeoObject}}<br>
      <b>Куда:</b> {{secontGeoObject}}<br>
      Посмотреть на сайте <a target="_blank" :href="'https://yandex.ru/maps?mode=routes&rtext='+x1+'%2C'+y1+'~'+x2+'%2C'+y2">Яндекс карты</a>
    </p>
       <p><b>Дистанция: </b> {{distance_text}} <br>
       <b>Время с учетом текущих пробок:</b> {{durationInTraffic_text}}<br>
       <b>Время в среднем:</b> {{duration_text}}</p>
    <p style="font-size:33px" ><b>Примерная стоимость:</b> {{price}} руб.</p>


     <p> <b-form-checkbox id="checkboxes1" name="tudaobratn" @change="tudaobratnoHandler"> Туда и обратно  <b-badge pill variant="success">скидка -50%</b-badge></b-form-checkbox></p>

</div>
</div>
<hr>
<div>
<div>
  <b-container>
    <b-input-group prepend="Введите телефон">
      <b-form-input type="tel" class="form-control" id="exampleFormControlInput1" v-mask="'+7(###)-###-####'" placeholder="+7(___)-___-____" v-model="tel"></b-form-input>
    </b-input-group>
  </b-container>

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
            <b-button  size="lg"  variant="danger">Заказать этот маршрут</b-button>
        </b-col>
     </b-row>
    </b-container>
   </div>



  </div>


</div>
</template>

<script>
export default {
  props: ['tarifs'],
  data () {
    return {
        mask: '##:##',
        placeholder: '23:45',
          tudaobratno:0,
        tel: '',
        selected: 0,
        passagers: 1,
        passagers_stand: 0,
        max_stand: 0,
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
  computed: {
    standShow(){ if(typeof this.tarifs != 'undefined') return this.tarifs[this.selected].mesta.standup>0?1:0;
    else return false }
  },
  mounted(){ window.v = this; ya_init()},
  methods: {
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
        this.max_stand  = this.tarifs[this.selected].mesta.standup;
        this.max_sit    = this.tarifs[this.selected].mesta.sitdown
        this.passagers =       this.passagers      >this.tarifs[this.selected].mesta.sitdown?this.tarifs[this.selected].mesta.sitdown:this.passagers;
        this.passagers_stand = this.passagers_stand>this.tarifs[this.selected].mesta.standup?this.tarifs[this.selected].mesta.standup:this.passagers_stand;
    },
    calculate_cost(){
          var min_cost    =  this.tarifs[this.selected].min_cost
          var deliv_tarif =  this.tarifs[this.selected].deliv_tarif
          var a = Math.round(Math.max( (this.distance_val / 1000) * deliv_tarif, min_cost));
          this.price = a>min_cost?a:min_cost;
          this.price = this.tudaobratno==1?(this.price/2+this.price):this.price;

    }
  }
}
</script>

<style>

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
