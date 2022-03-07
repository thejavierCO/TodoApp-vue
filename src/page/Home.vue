<template>
  <div>
    <h1>{{ title }}</h1>
    <form action="#" @submit.prevent="submit">
      <input type="number" name="id" min="0"/>
      <input type="text" name="title" placeholder="titulo"/>
      <input type="text" name="description" placeholder="descripcion"/>
      <input type="checkbox" name="state" placeholder="estado"/>
      <input type="submit" value="guardar"/>
    </form>
  </div>  
</template>

<script>
export default {
  name:"Home",
  props:{
    title:String
  },
  events:{
    update:()=>{},
    clear:()=>{},
    delete:()=>{}
  }
}
</script>