<template>
 <div>
    <h1> Примерная стоимость:
        {{cost}}
    <i class="fa fa-ruble-sign"></i>
    </h1>
</div>
</template>

<script>
  export default {
    props: ['tudaobratno',"price"],
    data() {
      return {
      }
    },
      mounted() {
      },
      computed: {
        cost(){
          if(this.tudaobratno>0){
            return (this.price/1.50) + " + " + (this.price-this.price/1.50) + " = " + this.price;   
          } else {
            return this.price;
          }
        }
      },
      methods: {}
  }
</script>
