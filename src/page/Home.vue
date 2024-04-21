<template>
  <div>
    <van-nav-bar title="{{title}}" />
    <form action="#" @submit.prevent="saveTask" id="data">
      <input type="number"    name="id"           v-db.max.auto min="0"  :value="this.db.length"  />
      <input type="text"      name="title"        v-db.task.onChange placeholder="titulo" />
      <input type="text"      name="description"  v-db.task.onChange placeholder="descripcion" />
      <input type="checkbox"  name="state"        v-db.task.onChange/>
      <van-button type="primary" name="save" @click="submitform">save</van-button>
      <van-button type="danger" name="delete" v-db.btn.auto>Delete</van-button>
      <van-button type="danger" name="clear" v-db.btn.auto>Clear All</van-button>
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
      exist:false
    }
  },
  methods:{
    saveTask({target:{children}}){
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
    },
    submitform({target:{parentNode}}){
      parentNode.dispatchEvent(new Event("submit"))
    }
  },
  events:{
    update({target}){
      const {id,title,description,state} = document.querySelector("form#data").children;
      localStorage.setItem("items",JSON.stringify(target.db))
      id.max = this.db.length;
      id.value = this.db.length;
      title.value = "";
      description.value = "";
      state.checked = false;
    },
    error:({detail:{msg}})=>{
      console.warn(msg);
      alert(msg);
    }
  }
}
</script>