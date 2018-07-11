<template>
  <div>
        <h3>Выберите транспорт:</h3>
        <v-select v-model="selected_obj" :on-change="selectCarHandler" :searchable="false" :options="tarifs" label="title">
          <span slot="no-options">Нет результатов... </span>
          <template slot="option" slot-scope="option">
                 <b-row  class="justify-content-md-center">
                              <b-col><b-badge pill variant="success">{{ option.title }}</b-badge>
                                <span style="font-weight:555" class="fa fa-male fa-1x" v-if="option.mesta>0"> 
                                  {{option.mesta}} </span> </b-col>
                              <b-col>{{ option.desc }} <span  v-if="option.mesta>0" >и подобные</span></b-col>
                              <b-col  cols="12" md="auto">от {{ option.min_cost }}
                                <i class="fa fa-ruble-sign" aria-hidden="true"></i>
                              </b-col>
                            <b-col cols="12" md="auto"><b-img slot="aside" :src="option.icon" width="100" alt="Фото транспорта" /></b-col>
                  </b-row>
          </template>
        </v-select>

  </div>
 </template>

<script>
  export default {
    props: ['tarifs'],
    data() {
      return {        selected_obj: {}      }
    },
    mounted() {      this.selected_obj = tarifs[this.selected]  },
    computed: {    },
    methods: {  selectCarHandler(e) {  this.$emit('select-car-handler', e)    } }
  }
</script>