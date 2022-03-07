<template>
  <div>
    <h1>{{ title }}</h1>
    <form action="#" @submit.prevent="submit" id="data">
      <input type="number" name="id" min="0" @change="change"/>
      <input type="text" name="title" placeholder="titulo"/>
      <input type="text" name="description" placeholder="descripcion"/>
      <input type="checkbox" name="state"/>
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
  data(){
    return {
      submit({target:{children}}){
        const {id,title,description,state} = children;
        let data = {
          "title" : title.value,
          "description" : description.value,
          "state" : state.value
          };
        if(!!this.dbget(id.value)){
          this.dbupdate(id.value,data);
        }else{
          this.dbpush(data);
        }
      }
    }
  },
  updated(a){
    console.log(a)
  },
  mounted(){
    const {id,title,description,state} = document.querySelector("form#data").children;
    id.max = this.db.length;
    id.value = this.db.length;
  },
  events:{
    update:(a)=>{console.log("up",a)},
    clear:()=>{console.log("c")},
    delete:()=>{console.log("del")},
    error:(err)=>{
      console.log(err)
    }
  }
}
</script>