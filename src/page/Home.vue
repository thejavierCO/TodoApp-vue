<template>
  <div>
    <h1>{{ title }}</h1>
    <Button title="init" />
  </div>  
</template>

<script>
import Button from "../components/button.vue";
export default {
  name:"Home",
  components:{
    Button
  },
  props:{
    title:String
  },
  events:{
    add:()=>{},
    del:()=>{},
    update:()=>{},
    edit:()=>{}
  }
}
</script>