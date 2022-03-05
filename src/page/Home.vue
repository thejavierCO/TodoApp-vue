<template>
  <div>
    <h1>{{ title }}</h1>
    <Form>
      <input type="number" name="id"  placeholder="0" min="0" v-db.max>
      <input type="text" name="title" placeholder="title" v-db.lastItem.title>
      <input type="text" name="description" placeholder="description" v-db.lastItem.description>
      <input type="checkbox" name="estado" id="state" v-db.lastItem.state>
      <label for="state">state</label>
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
    return {}
  },
  props:{
    title:String
  }
}
</script>