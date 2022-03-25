<script>
import BtnTasks from "../components/buttonsTasks.vue";
export default {
  name:"systemPrint",
  props:{
    data:Array
  },
  data(){
    return {
      tasks:[]
    }
  },
  components:{
    BtnTasks
  },
  events:{
    update({target},comp){
      comp.tasks = target.db;
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(item , index) in data" v-bind:key="index">
        <BtnTasks 
          :title="item.title" 
          :description="item.description" 
          :id="index" 
          :state="item.state" 
          @complateTask="$emits('complete',index)"
          @deleteTask="$emit('delete',index)"
        ></BtnTasks>
      </li>
    </ul>
  </div>
</template>