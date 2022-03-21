<template>
  <div>
    <h1>{{ title }}</h1>
    <form action="#" @submit.prevent="submit" id="data">
      <input type="number" name="id" min="0" @change="change"/>
      <input type="text" name="title" placeholder="titulo"/>
      <input type="text" name="description" placeholder="descripcion"/>
      <input type="checkbox" name="state"/>
      <input type="submit" value="guardar"/>
      <input type="button" value="delete" :class="{ show: exist , hidden: !exist}" name="delete_btn" @click="click"/>
      <input type="button" value="clear All" @click="clearAll">
    </form>
  </div>  
</template>

<style scoped>
  input[name="delete_btn"].show{
    display:inline-block;
  }
  input[name="delete_btn"].hidden{
    display:none;
  }
</style>

<script>
export default {
  name:"Home",
  props:{
    title:String
  },
  data(){
    return {
      exist:false,
      click({target:{parentNode}}){
        this.dbdel(parentNode.querySelector("input[name='id']").value);
      },
      clearAll(){
        this.db.clear()
      },
      change({target}){
        const {title,description,state} = document.querySelector("form#data").children;
        if(this.dbget(target.value)){
          this.exist = true;
          title.value = this.dbget(target.value).title
          description.value = this.dbget(target.value).description
          state.checked = this.dbget(target.value).state
        }else{
          this.exist = false;
          title.value = ""
          description.value = ""
          state.checked = false
        }
      },
      submit({target:{children}}){
        const {id,title,description,state} = children;
        let data = {
          "title" : title.value,
          "description" : description.value,
          "state" : state.checked
          };
        if(data.title!=""||data.description!=""){
          if(!!this.dbget(id.value)){
            this.dbupdate(id.value,data);
          }else{
            this.dbpush(data);
          }
        }else{
          this.db.alert("require content in title or decription")
        }
        title.value = "";
        description.value = "";
        state.checked = false;
      }
    }
  },
  mounted(){
    const {id} = document.querySelector("form#data").children;
    id.max = this.db.length;
    id.value = this.db.length;
    this.db.on("update",_=>this.exist = !!this.dbget(id.value))
  },
  events:{
    update({target}){
      const {id} = document.querySelector("form#data").children;
      localStorage.setItem("items",JSON.stringify(target.db))
      id.max = this.db.length;
      id.value = this.db.length;
    },
    error:({detail:{msg}})=>{
      console.warn(msg);
      alert(msg);
    }
  }
}
</script>