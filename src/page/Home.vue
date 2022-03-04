<template>
  <div>
    <h1>{{ title }}</h1>
    <Form>
      <input type="number" name="id" id="posicion" placeholder="0" min="0">
      <input type="text" name="title" id="" placeholder="title">
      <input type="text" name="description" id="" placeholder="description">
      <input type="checkbox" name="estado" id="">
      <input type="submit" value="Guardar">
    </Form>
  </div>  
</template>

<script>
import Form from "../components/form.vue";
export default {
  name:"Home",
  components:{
    Form
  },
  data:()=>{
    return {
      submit:(a)=>{
        console.log(a)
      }
    }
  },
  props:{
    title:String
  }
}
</script>