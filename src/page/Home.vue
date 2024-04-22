<template>
  <div>
    <van-nav-bar :title="title" />
    <van-grid :border="false" :column-num="1">
      <van-grid-item>
        <van-form @submit="saveTask" id="data">
          <van-cell-group inset>
            <van-field name="id">
              <template #input>
                <van-stepper v-model="valueMax" max="0" min="0" disable-input/>
              </template>
            </van-field>
            <van-field
              name="title"
              placeholder="title"
            />
            <van-field
              name="description"
              placeholder="description"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button type="primary" name="save">save</van-button>
            <van-button type="danger" name="delete">Delete</van-button>
            <van-button type="danger" name="clear">Clear All</van-button>
          </div>
        </van-form>
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="3" v-for="item in dt()" :key="item">
      <van-grif-item>
        <h1>{{ item.title }}</h1>
        <h3><span>{{ item.description }}</span></h3>
      </van-grif-item>
    </van-grid>
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
      exist:false,
      dt:()=>this.db.db,
      valueMax:0
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