<template>
  <div class="content">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <Form @saveTask="saveTask">
      <input type="number"    name="id"           v-db.max.auto min="0" :value="this.db.length"  />
      <input type="text"      name="title"        v-db.task.onChange    placeholder="titulo" />
      <input type="text"      name="description"  v-db.task.onChange    placeholder="descripcion" />
      <input type="checkbox"  name="state"        v-db.task.onChange/>
      <input type="submit"    name="save"         value="guardar"/>
      <input type="button"    name="delete"       v-db.show.auto        value="delete"  v-db.btn.auto/>
      <input type="button"    name="clear"        v-db.btn.auto         value="clear All"  />
    </Form>
    <Print :data="tasks"/>
  </div>  
</template>

<style scoped>
div.content{
  background:#000;
  color:#fff;
}
form{
  padding:10px;
}
</style>

<script>
import Print from "../components/printTask.vue";
import Form from "../components/form.vue";
export default {
  name:"Home",
  props:{
    title:String
  },
  data(){
    return {
      tasks:this.db.db
    }
  },
  components:{
    Print,
    Form
  },
  updated(){
    console.log("up")
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
        if(!!this.dbget(id.value))this.dbupdate(id.value,data);
        else this.dbpush(data);
      }else this.db.alert("require content in title or decription");
      title.value = "";
      description.value = "";
      state.checked = false;
    }
  },
  events:{
    update({target}){
      this.tasks = target.db;
      localStorage.setItem("items",JSON.stringify(target.db));
      const {id,title,description,state} = document.querySelector("form#data").children;
      id.max = target.db.length;
      id.value = target.db.length;
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